import axios from "axios"

export const request = async (url: string) => {
  try {
    const response = await axios.get(url)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
    throw new Error("Erro happened:")
  }
}