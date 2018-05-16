const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: YOUTUBE_SEARCH_URL,
        data: {part: 'snippet',
        key: 'AIzaSyCZv1bqNujg60v49AqjAMgq23nAZaL2cK4',      
        q: searchTerm,
        maxResults: 5,
        per_page: 5,
        type: 'video',
        },
        dataType: 'json',
        type: 'GET',
        success: callback
      };
    $.ajax(settings);
    console.log(`getDataFromApi ran`);
  }


function renderResult(item) {
    return `
        <div class="js-results">
            <a class="js-result-name" href="https://youtu.be/${item.id.videoId}"> 
                <img src="${item.snippet.thumbnails.medium.url}"/>
            ${item.snippet.title}</a>
        </div>
        `;
    
    
    console.log(`renderResult ran`); 
}

function displayThinkfulSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    
    $('.js-search-results').html(results);
    console.log(`displayThinkfulSearchData ran`)
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displayThinkfulSearchData);
    });
    console.log(`watchSubmit ran`)
}

$(watchSubmit);

