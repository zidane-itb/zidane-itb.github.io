let poster = document.querySelectorAll('.poster')
let overlay = document.querySelectorAll('.overlay')
let main_container = document.querySelector('#main')
let info_btn = document.querySelector('#info-btn')
let side = document.querySelector('#side')

info_btn.addEventListener('click', () => {
    side.style.visibility = 'hidden'
    main_container.style.width = '100%'
})

let movie_trailer = {
    'tt1843866' : 'https://www.youtube.com/embed/7SlILk2WMTI',
    'tt0848228' : 'https://www.youtube.com/embed/eOrNdBpGMv8',
    'tt0068646' : 'https://www.youtube.com/embed/HWqKPWO5T4o',
    'tt0071562' : 'https://www.youtube.com/embed/9O1Iy9od7-A',
    'tt4154756' : 'https://www.youtube.com/embed/6ZfuNTqbHE8',
    'tt4154796' : 'https://www.youtube.com/embed/TcMBFSGVi1c',
    'tt3498820' : 'https://www.youtube.com/embed/dKrVegVI0Us',
    'tt0458339' : 'https://www.youtube.com/embed/JerVrbLldXw',
    'tt0848228' : 'https://www.youtube.com/embed/eOrNdBpGMv8',
    'tt1375666' : 'https://www.youtube.com/embed/Qwe6qXFTdgc',
    'tt0816692' : 'https://www.youtube.com/embed/zSWdZVtXT7E',
    'tt0120737' : 'https://www.youtube.com/embed/V75dMMIW2B4',
    'tt0167261' : 'https://www.youtube.com/embed/LbfMDwc4azU',
    'tt0167260' : 'https://www.youtube.com/embed/r5X-hFf6Bwo'
}

let movie_list = ['tt1843866',
    'tt0848228',
    'tt0068646',
    'tt0071562',
    'tt4154756',
    'tt4154796',
    'tt3498820',
    'tt0458339',
    'tt0848228',
    'tt1375666',
    'tt0816692',
    'tt0120737',
    'tt0167261',
    'tt0167260'
]

let create_poster = async (imdbId) => {
    const movie = await fetchMovie(imdbId)

    let new_poster_container = document.createElement("div");
    new_poster_container.classList.add("poster-container");

    let new_poster = document.createElement("div")
    new_poster.classList.add("poster")
    new_poster.style.backgroundImage = `url(${movie.Poster})`

    let new_overlay = document.createElement("div")
    new_overlay.classList.add("overlay")

    new_overlay.addEventListener('click', () => {
        side.style.visibility = 'visible'
        main_container.style.width = '50%'
        document.querySelector('#info-title').innerText = movie.Title
        document.querySelector('#info-additional').innerText = `${movie.Year} - ${movie.Director} - ${movie.Runtime}`
        document.querySelector('#info-description').innerText = movie.Plot
        document.querySelector('#video-frame').src = movie_trailer[imdbId]
    })

    let new_movie_title = document.createElement("div")
    new_movie_title.classList.add("movie-title")
    new_movie_title.innerText = movie.Title
    new_overlay.appendChild(new_movie_title)

    new_poster_container.append(new_poster, new_overlay)

    main_container.appendChild(new_poster_container)
}

const fetchMovie = async (imdbId) => {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=c2116020`, {
        method: 'GET'
    })
    return res.json()
}

movie_list.forEach(movie_id => {
    create_poster(movie_id)
})
