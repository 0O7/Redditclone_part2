(function() {
  'use strict';

  angular.module('app')
    .service('crudService', ['$http', function service($http) {

      const db = this;
      db.postEntriesFromDatabase = [];


      db.getPosts = function() {
        return $http.get('/api/posts').then(function(response) {
          db.postEntriesFromDatabase = response.data;
        })
      }

      db.addPost = function(newPostData) {
        $http.post('api/posts', newPostData).then(function(response) {
          db.postEntriesFromDatabase.push(response.data);
        })
      }


      db.voteUp = function(postID) {
        $http.post(`/api/posts/${postID}/votes`).then(function(response) {
          for (var i = 0; i < db.postEntriesFromDatabase.length; i++) {
            if (db.postEntriesFromDatabase[i].id == postID) {
              db.postEntriesFromDatabase[i].vote_count = response.data.vote_count;
            }
          }
        })
      }

      db.voteDown = function(postID) {
        $http.delete(`/api/posts/${postID}/votes`).then(function(response) {
          for (let i = 0; i < db.postEntriesFromDatabase.length; i++) {
            if (db.postEntriesFromDatabase[i].id === postID) {
              db.postEntriesFromDatabase[i].vote_count -= 1;
            }
          }
        });
      };
      // ending service
    }])
  // ending iffe
}());