
let baseUrl = `http://localhost:5000/api/v1`

export const getCategories = async function () {
    try {
        const response = await fetch(`${baseUrl}/advertisementcategories`,{
            method:"GET"
        })
        if (response.status === 200) {
            const data = await response.json()
            return data
        }
    } catch (error) {
            console.log(error);      
    }
}

export const getType = async function () {
  try {
      const response = await fetch(`${baseUrl}/advertisementtypes`,{
          method:"GET"
      })
      if (response.status === 200) {
          const data = await response.json()
          return data
      }
  } catch (error) {
          console.log(error);      
  }
}

export const getCityArea = async function () {
  try {
      const response = await fetch(`${baseUrl}/cityareas`,{
          method:"GET"
      })
      if (response.status === 200) {
          const data = await response.json()
          return data
      }
  } catch (error) {
          console.log(error);      
  }
}

export const getStatus = async function () {
  try {
      const response = await fetch(`${baseUrl}/advertisementstatus`,{
          method:"GET"
      })
      if (response.status === 200) {
          const data = await response.json()
          return data
      }
  } catch (error) {
          console.log(error);      
  }
}

export const getCountries = async function () {
  try {
      const response = await fetch(`${baseUrl}/countries`,{
          method:"GET"
      })
      if (response.status === 200) {
          const data = await response.json()
          return data
      }
  } catch (error) {
          console.log(error);      
  }
}

export  const getCarouselImages = async function () {
    try {
      const response = await fetch(`${baseUrl}/carousels`,{
        method:"GET"
      })
      if (response.status === 200) {
        const data = response.json()
       return data
      }
    } catch (error) {
      console.log(error);
    }
  }

  export  const getAdvertisements = async function () {
    try {
      const response = await fetch(`${baseUrl}/advertisements`,{
        method:"GET"
      })
      if (response.status === 200) {
        const data = response.json()
       return data
      }
    } catch (error) {
      console.log(error);
    }
  }
