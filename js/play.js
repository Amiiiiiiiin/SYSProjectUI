const RESTUrl = "https://udprest20220504132553.azurewebsites.net/api/colour"
const APIUrl = "https://theaudiodb.com/api/v1/json/523532/searchtrack.php"
const updateProfileUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/update/profile?profileName="
const genreColourUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/profiles/genres?profileName="
const baseUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/profiles"

Vue.createApp({
    data() {
        return {
            searchedTrack: null,
            artist: "",
            track: "",
            error: null,
            currentProfile: "",
            backgroundColour: "white",
            profiles: []
        }
    },
    async created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        //this.helperGetByArtistAndTrack(APIUrl)
    },
    methods: {
        async getByArtistAndTrack(artist, track) {
            if (artist == !null  || artist == "" & track == !null || track == "") {
                this.error = "No artist or track entered"
                this.searchedTrack = null
            } else { 
                var aurl = APIUrl + "?s=" + artist + "&t=" + track
                console.log(aurl)
                console.log("getByArtistAndTrack: " + artist + " " + track)
                this.helperGetByArtistAndTrack(aurl)
            }
        },
        async getColourFromGenre(genre) {
            const response = await axios.get(RESTUrl + "/profiles/genres/colours?profileName=" + this.currentProfile + "&genre=" + genre)
            console.log(response.data)
            this.backgroundColour = response.data
        },
        async helperGetByArtistAndTrack(aurl) {
            try {
                const response = await axios.get(aurl)
                //console.log("1")
                this.searchedTrack = await response.data
                console.log(this.searchedTrack)
                var trackArray = this.searchedTrack.track
                console.log(trackArray)
                var currentTrack = trackArray[0]
                console.log(currentTrack)
                this.getColourFromGenre(currentTrack.strGenre)
                console.log(currentTrack.strGenre)
                //console.log("")
                this.error = null
                console.log("5")
                //console.log("")
            } catch (ex) {
                //console.log("")
                this.searchedTrack = null
                //console.log("")
                this.error = ex.message
                //console.log("")
            }
        },
        async genreColourGetAndShow(profile) {
            try {
                const putResponse = await axios.put(updateProfileUrl + profile)
                console.log(putResponse.data)
                const getResponse = await axios.get(genreColourUrl + profile)
                this.currentProfile = profile
            } catch (ex) {
                alert(ex.message)
            }
        },
        getAllProfiles() {    
            this.helperGetAndShow(baseUrl)
        },
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.profiles = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
    }
}).mount("#app")
