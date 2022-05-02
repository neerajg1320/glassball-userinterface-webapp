import config from '../config/default_config'

export const getServerUrl = (file) => {
    return `${file.file}`
}

export const getMediaUrlFromName = (name) => {
    return `${config.server.media}/${name}`
}