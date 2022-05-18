import { ADD_RESOURCE, UPDATE_RESOURCE, REMOVE_RESOURCE, SET_RESOURCES, SET_CURRENT_RESOURCE } from "./resourceAction.types";
import axios from 'axios'


const addResource = (resType, resource) => {
    return {
        type: ADD_RESOURCE,
        payload: {
            resType,
            resource
        }
    }
}

const updateResource = (resType, id, update) => {
    return {
        type: UPDATE_RESOURCE,
        payload: {
            resType,
            id,
            update
        }
    }
}

const removeResource = (resType, resourceId) => {
    return {
        type: REMOVE_RESOURCE,
        payload: {
            resType,
            id: resourceId
        }
    }
}

const setResources = (resType, resources) => {
    return {
        type: SET_RESOURCES,
        payload: {
            resType,
            resources
        }
    }
}

const setCurrentResource = (resType, link) => {
    return {
        type: SET_CURRENT_RESOURCE,
        payload: {
            resType,
            link
        }
    }
}

export const uploadResourceAsyncMock = (resType, resource) => {
    var counter = 0

    return (dispatch) => {
        dispatch(addResource(resType, resource))

        const timer = setInterval(() => {
            ++counter;
            dispatch(updateResource(resType, resource.id, {completed: counter * 10}))

            // Time stop condition
            if (counter >= 10) {
                // counter = 0;
                clearInterval(timer)

                setTimeout(() => {
                    dispatch(updateResource(resType, resource.id, {uploaded: true}))
                }, 10)
            }
        }, 200)
    }
}

export const updateResourceAsyncMock = (resType, id, update) => {
    return (dispatch) => {
        dispatch(updateResource(resType, id, update))
    }
}

export const removeResourceAsyncMock = (resType, resourceId) => {
    return (dispatch) => {
        dispatch(removeResource(resType, resourceId))
    }
}

export const addResourceAsync = (resType, resource) => {
    return (dispatch) => {
        dispatch(addResource(resType, resource))
    }
}

export const uploadResourceAsync = (resType, fileObj, formData, action) => {
    console.log("formData:", formData)

    return (dispatch, getState) => {
        let uploadUrl = `${getState().configReducer.server[resType]}/`;
        if (action) {
            uploadUrl += `${action}/`
        }

        axios.post(
            uploadUrl,
            formData,
            { 
              headers: {
                'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
              },
              onUploadProgress: progress => {
                const completedPercent = Math.round((progress.loaded / fileObj.size) * 100)
                dispatch(updateResource(resType, fileObj.id, {completed: completedPercent}))
              }
            }
          )
          .then(response => {
            const addedResource = response.data

            dispatch(updateResource(resType, fileObj.id, {
                id: addedResource.id,
                file: addedResource.file,
                size: addedResource.size,
                uploaded: true
            }
            ))
          })
          .catch(error => {
            console.log(error)
          })
    }
}

export const uploadResourceFilesAsync = (resType, resObj, formData, action) => {
    console.log("formData:", formData)

    return (dispatch, getState) => {
        let uploadUrl = `${getState().configReducer.server[resType]}/`;
        if (action) {
            uploadUrl += `${action}/`
        }

        axios.post(
            uploadUrl,
            formData,
            {
              headers: {
                'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
              },
              // onUploadProgress: progress => {
              //   const completedPercent = Math.round((progress.loaded / fileObj.size) * 100)
              //   dispatch(updateResource(resType, fileObj.id, {completed: completedPercent}))
              // }
            }
          )
          .then(response => {
            const addedResource = response.data

            // dispatch(updateResource(resType, fileObj.id, {
            //     id: addedResource.id,
            //     file: addedResource.file,
            //     size: addedResource.size,
            //     uploaded: true
            // }
            // ))
          })
          .catch(error => {
            console.log(error)
          })
    }
}

// Not used so far we plan to use it for resource name change etc
export const updateResourceAsync = (resType, id, update) => {
    return (dispatch) => {
        dispatch(updateResource(resType, id, update))
    }
}

export const removeResourceAsync = (resType, resource) => {

    return (dispatch, getState) => {
        // Send request to server only if we have the path on the server
        // In case we do not have path on server that means resource is present locally
        if (resource.uploaded) {
            const res_del_url = `${getState().configReducer.server[resType]}/${resource.pkid}/`
            axios.delete(
                res_del_url,
                {
                    headers: {
                        'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
                    }
                }
            )
            .then(response => {
                // console.log(response)
                dispatch(removeResource(resType, resource.id))
            })
            .catch(error => {
                // console.log(error)
                if (error.response && error.response.status === 404) {
                    dispatch(removeResource(resType, resource.id))
                }
            })  
        } else {
            dispatch(removeResource(resType, resource.id))
        }
    }
}



export const fetchResourcesAsync = (resType, params) => {
    // We are accessing state in action creater to get server url
    return (dispatch, getState) => {
        const url = `${getState().configReducer.server[resType]}/`
        console.log('url:', url)

        axios.get(
            url,
            {
                params,
                headers: {
                    'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
                }
            }
        )
        .then(response => {
            // console.log(response);
            var resources;
            if('resources' in response.data) {
                // Response from flask
                resources = response.data.resources ? response.data.resources : []
            } else {
                // Response from django
                resources = response.data ? response.data : []
            }

            // resources.forEach(resource => console.log(resource))
            console.log("resources.length=", resources.length)
            resources = resources.map(resource => {resource['uploaded'] = true; return resource;})
            dispatch(setResources(resType, resources))
        })
        .catch(error => {
            console.log(error)
        })
    }
}


export const downloadResourcesAsyncWithAccept = (resType, params) => {
    // We are accessing state in action creator to get server url
    return (dispatch, getState) => {
        axios.get(
            `${getState().configReducer.server[resType]}/`,
            {
                params,
                headers: {
                    'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`,
                    'Accept': 'application/xlsx',
                },
                responseType:'blob'
            }
        )
            .then((response) => {
                console.log("downloadResourcesAsyncWithAccept():", response.data)
                return response.data;
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', params.filename);

                // Append to html page
                document.body.appendChild(link);
                // Force download
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const downloadResourcesAsync = (resType, params, action) => {
    // We are accessing state in action creator to get server url
    return (dispatch, getState) => {
        let downloadUrl = `${getState().configReducer.server[resType]}/`;
        if (action) {
            downloadUrl += `${action}/`
        }

        axios.get(
            downloadUrl,
            {
                params,
                headers: {
                    'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
                },
                responseType:'blob'
            }
        )
            .then((response) => {
                console.log("downloadResourcesAsync():", response.data)
                return response.data;
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', params.filename);

                // Append to html page
                document.body.appendChild(link);
                // Force download
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const actionResourcesAsync = (resType, action, params) => {
    // We are accessing state in action creater to get server url
    return (dispatch, getState) => {
        axios.get(
            `${getState().configReducer.server[resType]}/${action}`,
            {
                params,
                headers: {
                    'Authorization': `${getState().authReducer.token_title} ${getState().authReducer.token}`
                }
            }
        )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const setCurrentResourceAsync = (resType, link) => {
    // console.log("setCurrentResourceAsync", link)
    return (dispatch) => {
        dispatch(setCurrentResource(resType, link))
    }
}