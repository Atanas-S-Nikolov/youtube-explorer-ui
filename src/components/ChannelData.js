import React, { useEffect } from "react";
import { Button, Divider, Input, Typography } from 'antd';
import youtube from '../api/youtube';
import { isChannelNameValid } from '../utils/validation-utils';
import DynamicGrid from "../utils/DynamicGrid";
import ChannelDataGrid from "./ChannelDataGrid";
import EmbeddedVideoPlayer from "./EmbeddedVideoPlayer";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getChannelInformation, addVideos, changeChannelName, updateChannelId, updateErrorStatus, resetState } from "../redux/channelDataSlice"

const { Text } = Typography;

function findChannelByName(channelName) {
    return youtube.get("search", {
        params: {
            "q": channelName,
            "type": "channel"
        }
    });
}

function getChannelById(channelId, dispatch) {
    const promise = youtube.get("/channels", {
        params: {
            "part": "snippet,contentDetails,statistics",
            "id": channelId
        }
    });
        
    promise.then((response) => {
        const items = response.data.items;
        if (items) {
            dispatch(getChannelInformation({
                channelLink: "https://www.youtube.com/" + items[0].snippet.customUrl,
                gridDisplayStatus: "inline",                    
                subscribersCount: items[0].statistics.subscriberCount,
                viewsCount: items[0].statistics.viewCount,
                videosCount: items[0].statistics.videoCount
            }))
            const uploadsId = items[0].contentDetails.relatedPlaylists.uploads;
            getChannelUploads(uploadsId, dispatch);       
        }
    }).catch(error => console.log(error));
}

function getChannelUploads(uploadsId, dispatch) {
    const promise = youtube.get("/playlistItems", {
        params: {
            "part": "contentDetails",
            "playlistId": uploadsId,
            "maxResults": 50
        }
    });

    promise.then((response) => {
        const videoIds = getVideoIds(response.data.items);
        const videosPromise = getChannelVideos(videoIds.join());
        // const videos = [];
        // videos.push(getMostViewedVideo(videosPromise));
        // videos.push(getMostLikedVideo(videosPromise));
        // videos.push(getMostCommentedVideo(videosPromise));
        // every video is undefined
        resolveVideos(videosPromise, dispatch)
    });
}

function getVideoIds(items) {
    const videoIds = [];

    items.forEach(item => {
        videoIds.push(item.contentDetails.videoId);
    });

    return videoIds;
}

function getChannelVideos(ids) {
    return youtube.get("/videos", {
        params: {
            "part": "snippet,statistics",
            "id": ids
        }
    });
}

function resolveVideos(videosPromise, dispatch) {
    videosPromise.then((response) => {
        const channelVideos = response.data.items;

        channelVideos.sort((item1, item2) => item2.statistics.viewCount - item1.statistics.viewCount);
        const mostViewedVideo = buildVideo(channelVideos[0], "The most viewed video");

        channelVideos.sort((item1, item2) => item2.statistics.likeCount - item1.statistics.likeCount);
        const mostLikedVideo = buildVideo(channelVideos[0], "The most liked video");

        channelVideos.sort((item1, item2) => item2.statistics.commentCount - item1.statistics.commentCount);
        const mostCommentedVideo = buildVideo(channelVideos[0], "The most commented video");

        dispatch(addVideos([mostViewedVideo, mostLikedVideo, mostCommentedVideo]));
    });
}

function buildVideo(video, label) {
    return {
        id: video.id,
        title: video.snippet.title,
        displayStatus: "inline",
        label: label
    };
}

function onChangeChannelName(name, dispatch) {
    dispatch(changeChannelName({
        isChannelNameValid: isChannelNameValid(),
        channelName: name.trim()
    }));
}

function onGetChannelData(channelName, dispatch) {
    let errorMessage = "";
    let linkBtnStatus = true;

    if(isChannelNameValid(channelName)) {
        findChannelByName(channelName).then(response => {
            const id = response.data.items[0].id.channelId;
            dispatch(updateChannelId(id));
            getChannelById(id, dispatch);
        });
        linkBtnStatus = false;
    } else {
        errorMessage = "Channel name must not be empty!";
    }

    dispatch(updateErrorStatus({
        channelNameError: errorMessage,
        isLinkBtnDisabled: linkBtnStatus
    }))
}

function renderVideos(videos) {
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

function ChannelData() {
    const dispatch = useDispatch();
    const { channelName, channelLink, channelNameError, isLinkBtnDisabled, gridDisplayStatus, subscribersCount,
         viewsCount, videosCount, videos } = useSelector((state) => state.channelData);

    // componentWillUnmount
    useEffect(() => {
        return function cleanUp() {
            dispatch(resetState())
        } 
    }, [dispatch])

    return(
        <div className="channel-data">
            <Text type="danger">{channelNameError}</Text>
            <br/>
            <Input className="channel-data-input"
                type='text'
                placeholder="Enter channel name" 
                style={{ width: 325 }}
                onChange={(event) => {
                    event.preventDefault();
                    onChangeChannelName(event.target.value, dispatch)
                }}
            />
            <Divider style={{ margin: 5, border: 'none' }}/>
            <Button 
                onClick={() => onGetChannelData(channelName, dispatch)}
                >GET CHANNEL DATA</Button>
            <a href={channelLink} 
                rel="noreferrer noopener" target="_blank" 
                style={{ marginLeft: 20, textDecoration: "none"}}
            >
                <Button disabled = {isLinkBtnDisabled}>VISIT CHANNEL</Button>
            </a>
            <ChannelDataGrid
                subscribersCount={subscribersCount} 
                viewsCount={viewsCount}
                videosCount={videosCount}
                displayStatus={gridDisplayStatus}
            />
            {renderVideos(videos)}
        </div>
    );
} 

export default ChannelData;
