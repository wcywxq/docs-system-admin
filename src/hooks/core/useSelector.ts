import { createSelectorHook } from "react-redux"

type RootStateType = {
  login: LoginStateType
}

export const useSelector = createSelectorHook<RootStateType>();