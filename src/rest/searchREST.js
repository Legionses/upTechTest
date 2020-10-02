export const getCityData = (query = "") => {
    const URL = `https://www.omio.com.ua/suggester-api/v5/position?term=${query}&locale=uk&hierarchical=true`;

    return fetch(URL)
};