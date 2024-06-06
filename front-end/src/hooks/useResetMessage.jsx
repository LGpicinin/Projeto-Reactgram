import { resetMessage } from "../slices/photoSlice";
import { resetUserMessage  } from "../slices/userSlice";

export const useResetMessage = (dispatch, type) => {

    return () => {
        setTimeout(() => {
            if(type == "user")
                dispatch(resetUserMessage())
            else
                dispatch(resetMessage())
        }, 2000)
    }
}