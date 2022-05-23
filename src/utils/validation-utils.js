import { hasWhiteSpace } from "./string-utils";

export function isChannelNameValid(channelName) {
    if(!channelName || hasWhiteSpace(channelName)) {
        return false;
    }

    return true;
}
