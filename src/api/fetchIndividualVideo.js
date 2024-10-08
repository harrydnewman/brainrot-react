
export default async function fetchIndividualVideo(){
    try {
        const response = await fetch("http://46.101.219.105:6001/api/");
        const responseData = await response.json();
        console.log("ResponseData:", responseData);
        return responseData;
    } catch (error){
        console.error("Error fetching video:", error);
    }
}