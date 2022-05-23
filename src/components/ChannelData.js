import React, { Component }  from "react";

import { Button, Divider, Input, Typography } from 'antd';

import youtube from '../api/youtube';
import { isChannelNameValid } from '../utils/validation-utils';
import DynamicGrid from "../utils/DynamicGrid";
import ChannelDataGrid from "./ChannelDataGrid";
import EmbeddedVideoPlayer from "./EmbeddedVideoPlayer";

const { Text } = Typography;

class ChannelData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelId: "",
            channelName: "",
            channelLink: "",
            channelNameError: "",
            isLinkBtnDisabled: true,
            gridDisplayStatus: "none",
            subscribersCount: "",
            viewsCount: "",
            videosCount: "",
            videos: []
        };
    }
    
    findChannelByName = (channelName) => {
        return youtube.get("search", {
            params: {
                "q": channelName,
                "type": "channel"
            }
        });
    }
    
    getChannelById = (channelId) => {
        const promise = youtube.get("/channels", {
            params: {
                "part": "snippet,contentDetails,statistics",
                "id": channelId
            }
        });
            
        promise.then((response) => {
            const items = response.data.items;
            if (items) {
                this.setState({
                    channelLink: "https://www.youtube.com/" + items[0].snippet.customUrl,
                    gridDisplayStatus: "inline",                    
                    subscribersCount: items[0].statistics.subscriberCount,
                    viewsCount: items[0].statistics.viewCount,
                    videosCount: items[0].statistics.videoCount,
                    videos: []
                });
                const uploadsId = items[0].contentDetails.relatedPlaylists.uploads;
                this.getChannelUploads(uploadsId);       
            }
        }).catch(error => console.log(error));
    }

    getChannelUploads(uploadsId) {
        const promise = youtube.get("/playlistItems", {
            params: {
                "part": "contentDetails",
                "playlistId": uploadsId,
                "maxResults": 50
            }
        });

        promise.then((response) => {
            const videoIds = this.getVideoIds(response.data.items);
            const videosPromise = this.getChannelVideos(videoIds.join());
            this.getMostViewedVideo(videosPromise);
            this.getMostLikedVideo(videosPromise);
            this.getMostCommentedVideo(videosPromise);
        });
    }

    getVideoIds(items) {
        const videoIds = [];

        items.forEach(item => {
            videoIds.push(item.contentDetails.videoId);
        });

        return videoIds;
    }

    getChannelVideos(ids) {
        return youtube.get("/videos", {
            params: {
                "part": "snippet,statistics",
                "id": ids
            }
        });
    }

    getMostViewedVideo(videosPromise) {
        videosPromise.then((response) => {
            const videos = response.data.items;
            videos.sort((item1, item2) => item2.statistics.viewCount - item1.statistics.viewCount);
            this.addVideo(videos[0], "The most viewed video"); 
        });
    }

    getMostLikedVideo(videosPromise) {
        videosPromise.then((response) => {
            const videos = response.data.items;
            videos.sort((item1, item2) => item2.statistics.likeCount - item1.statistics.likeCount);
            this.addVideo(videos[0], "The most liked video"); 
        });
    }

    getMostCommentedVideo(videosPromise) {
        videosPromise.then((response) => {
            const videos = response.data.items;
            videos.sort((item1, item2) => item2.statistics.commentCount - item1.statistics.commentCount);
            this.addVideo(videos[0], "The most commented video"); 
        });
    }

    addVideo(video, label) {
        this.setState((prevState) => {
            return prevState.videos.push({
                id: video.id,
                title: video.snippet.title,
                displayStatus: "inline",
                label: label
            });
        });
    }

    onChangeChannelName(name) {
        if (isChannelNameValid(name)) {
            this.setState({
                channelNameError: ""
            });
        }

        this.setState({
            channelName: name.trim()
        });
    }

    onGetChannelData() {
        const channelName = this.state.channelName;
        let errorMessage = "";
        let linkBtnStatus = true;

        if(isChannelNameValid(channelName)) {
            this.findChannelByName(channelName).then(response => {
                const id = response.data.items[0].id.channelId;
                this.setState({
                    channelId: id
                });
                this.getChannelById(id);
            });
            linkBtnStatus = false;
        } else {
            errorMessage = "Channel name must not be empty!";
        }

        this.setState({
            channelNameError: errorMessage,
            isLinkBtnDisabled: linkBtnStatus
        });
    }

    handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            this.onGetChannelData();
        }
    }

    renderVideos() {
        let videos = this.state.videos;
        const rowsCount = Math.ceil(videos.length / 3);

        videos = videos.map((video, index) => (
            <EmbeddedVideoPlayer
                key={index}
                videoId={video.id}
                videoTitle={video.title}
                displayStatus={video.displayStatus}
                label={video.label}
            />
        ));

        const dynamicGrid = new DynamicGrid(rowsCount, 8);        
        return (
            <div className="video-players">
                {dynamicGrid.fillGrid(videos)}
            </div>
        );
    }

    render() {
        return(
            <div className="channel-data">
                <Text type="danger">{this.state.channelNameError}</Text>
                <br/>
                <Input className="channel-data-input"
                    type='text'
                    placeholder="Enter channel name" 
                    style={{ width: 325 }}
                    onChange={(event) => {
                        event.preventDefault();
                        this.onChangeChannelName(event.target.value)
                    }}
                    onKeyDown={this.handleKeyEnter}
                />
                <Divider style={{ margin: 5, border: 'none' }}/>
                <Button 
                    onClick={() => this.onGetChannelData()}
                    >GET CHANNEL DATA</Button>
                <a href={this.state.channelLink} 
                    rel="noreferrer noopener" target="_blank" 
                    style={{ marginLeft: 20, textDecoration: "none"}}
                >
                    <Button disabled = {this.state.isLinkBtnDisabled}>VISIT CHANNEL</Button>
                </a>
                <ChannelDataGrid
                    subscribersCount={this.state.subscribersCount} 
                    viewsCount={this.state.viewsCount}
                    videosCount={this.state.videosCount}
                    displayStatus={this.state.gridDisplayStatus}
                />
                {this.renderVideos()}
            </div>
        );
    }
}

export default ChannelData;
