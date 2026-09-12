import axios from 'axios'

const API_URL = 'https://itunes.apple.com/search'

export async function searchMusic(query, type = 'songs') {
    let entity = 'song'

    if (type === 'artists') {
        entity = 'musicArtist'
    }

    if (type === 'albums') {
        entity = 'album'
    }

    if (type === 'soundtracks') {
        entity = 'song'
    }

    const response = await axios.get(API_URL, {
        params: {
            term: query,
            media: 'music',
            entity,
            limit: 40
        }
    })

    return response.data.results.map((item, index) => {
        const isArtist = type === 'artists'
        const isAlbum = type === 'albums'

        return {
            id:
                item.trackId ||
                item.collectionId ||
                item.artistId ||
                `${type}-${index}`,

            title:
                item.trackName ||
                item.collectionName ||
                item.artistName ||
                'Unknown',

            artist:
                item.artistName ||
                'Unknown artist',

            album:
                item.collectionName ||
                '',

            cover:
                item.artworkUrl100
                    ? item.artworkUrl100.replace('100x100', '600x600')
                    : '',

            preview:
                item.previewUrl || '',

            duration:
                item.trackTimeMillis || 0,

            sourceUrl:
                item.trackViewUrl ||
                item.collectionViewUrl ||
                item.artistLinkUrl ||
                '',

            genre:
                item.primaryGenreName || '',

            releaseDate:
                item.releaseDate || '',

            country:
                item.country || '',

            kind:
                item.kind || '',

            type,

            isArtist,
            isAlbum,

            collectionPrice:
                item.collectionPrice ?? null,

            trackPrice:
                item.trackPrice ?? null
        }
    })
}