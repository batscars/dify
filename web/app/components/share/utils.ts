import { CONVERSATION_ID_INFO } from '../base/chat/constants'
import { fetchAccessToken } from '@/service/share'

export const checkOrSetAccessToken = async () => {
  const sharedToken = globalThis.location.pathname.split('/').slice(-1)[0]
  const searchParams = new URLSearchParams(globalThis.location.search)
  const headImage = searchParams.get('headImage')
  const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
  let accessTokenJson = { [sharedToken]: '' }
  try {
    accessTokenJson = JSON.parse(accessToken)
  }
  catch (e) {

  }
  if (!accessTokenJson[sharedToken]) {
    const res = await fetchAccessToken(sharedToken, { externalUserId: searchParams.get('externalUserId') || '' })
    accessTokenJson[sharedToken] = res.access_token
    localStorage.setItem('token', JSON.stringify(accessTokenJson))
    if (headImage !== null && headImage !== undefined)
      localStorage.setItem('headImage', headImage)
  }
}

export const setAccessToken = async (sharedToken: string, token: string) => {
  const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
  let accessTokenJson = { [sharedToken]: '' }
  try {
    accessTokenJson = JSON.parse(accessToken)
  }
  catch (e) {

  }

  localStorage.removeItem(CONVERSATION_ID_INFO)

  accessTokenJson[sharedToken] = token
  localStorage.setItem('token', JSON.stringify(accessTokenJson))
}

export const removeAccessToken = () => {
  const sharedToken = globalThis.location.pathname.split('/').slice(-1)[0]

  const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
  let accessTokenJson = { [sharedToken]: '' }
  try {
    accessTokenJson = JSON.parse(accessToken)
  }
  catch (e) {

  }

  localStorage.removeItem(CONVERSATION_ID_INFO)

  delete accessTokenJson[sharedToken]
  localStorage.setItem('token', JSON.stringify(accessTokenJson))
}

export const getQueryParam = (param: string): string | null => {
  const searchParams = new URLSearchParams(globalThis.location.search)
  return searchParams.get(param)
}
