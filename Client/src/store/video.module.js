import ApiService from '../services/api.service';

const initialState = null;
export const video = {
  namespaced: true,
  state: initialState,
  actions: {
    getVideoProperties( {}, payload ){
      return new Promise ( async function (resolve, reject) {
        return await ApiService.getVideoProperties(payload.id)
          .then(function (response) {
            if(response.status){
              const data = response; 
              resolve(data);
            } else {
              const error = response.error || "NetworkError";
              reject(error);
            }
          });
      });
    },
    getRecommendedVideos( {}, payload ){
      return new Promise ( async function (resolve, reject) {
        return await ApiService.getRecomendedVideos(payload.currentVideo)
          .then(function (response) {
            if(response.status){
              const data = response; 
              resolve(data);
            } else {
              const error = response.error || "NetworkError";
              reject(error);
            }
          });
      });
    },
    getVideosForHomePage() { // in future : getVideoForHomePage For Personalization (User logged in)
      return new Promise( async (resolve, reject) => {
        await ApiService.getVideos()
          .then( 
            response=>{
              if(response.status) 
                resolve (response.data);
              else 
                reject(response.error);
            });
      });
    },
    upload({}, payload){
      return new Promise ( async function (resolve, reject) {
        return await ApiService.uploadVideo(payload)
          .then(function (response) {
            if(response.status){
              const data = response; 
              resolve(data);
            } else {
              const error = response.error || "NetworkError";
              reject(error);
            }
          });
      });
    },
    countView({}, payload){
      return new Promise ( async function (resolve, reject) {
        return await ApiService.countView(payload)
          .then(function (response) {
            if(response.status){
              const data = response; 
              resolve(data);
            } else {
              const error = response.error || "NetworkError";
              reject(error);
            }
          });
      });
    }
  },
};