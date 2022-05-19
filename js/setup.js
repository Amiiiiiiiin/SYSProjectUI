const baseUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/profiles"
const genreColourUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/profiles/genres?profileName="
const profileNameUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/profiles?profileName="
const updateGenreUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/update/genre?genre="
const updateProfileUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour/update/profile?profileName="
const profileDeleteUrl = "https://udprest20220504132553.azurewebsites.net/api/Colour?profileName="

Vue.createApp({
    data() {
        return {
            profiles: [],
            genreColours: [],
            newProfileName: "",
            updateGenreColour: "",
            deleteProfile: "",
        }
    },
    methods: {
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
        async genreColourGetAndShow(profile) {
            try {
                const putResponse = await axios.put(updateProfileUrl + profile)
                console.log(putResponse.data)
                const getResponse = await axios.get(genreColourUrl + profile)
                this.genreColours = await getResponse.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async setActiveGenre(genre) {
            try {
                const response = await axios.put(updateGenreUrl + genre)
                console.log(response.data)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async saveProfileName() {
            try {
                const response = await axios.post(profileNameUrl + this.newProfileName)
                this.getAllProfiles()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteProfileName() {
            try {
                //const profileDeleteUrl = profileDeleteUrl + deleteProfile
               const response = await axios.delete(profileDeleteUrl + this.deleteProfile)
                //this.deleteMessage = response.status + " " + response.statusText
                this.getAllProfiles()
            } catch (ex) {
                alert(ex.message)
            }
        },

    }
}
).mount("#app")
