        //this object contains globally shared config parmaeters 

var platform = 'YOUR URL HERE';
var encodedPageUrl = encodeURIComponent(platform);
var social = "SOCIAL COPY HERE";
var hashtag = 'HASHTAG'; //no hashes
var tweet = encodeURIComponent(social) + '&hashtags='+hashtag;
module.exports = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        description_short: "DESCRIPTION SHORT",
        social: social,
        platform: platform,
        tweet: tweet,
        encodedPageUrl: encodedPageUrl,
        slug: 'URL SLUG',
        hashtag: '#'+hashtag,
        imagePath: 'images/'//css path for images      
    };