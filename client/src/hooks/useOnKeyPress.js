import {useEffect} from 'react';

export const useOnKeyPress = (callback, targetKey)=>{

    useEffect(()=>{
        const keyPressHandler = (event)=>{
            if (event.key === targetKey) {
                callback();
            }
        }

        window.addEventListener('keydown', keyPressHandler);

        return ()=>{
            window.removeEventListener('keydown', keyPressHandler);
        }

    },[callback, targetKey]);
};
