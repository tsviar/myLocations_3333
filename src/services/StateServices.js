import React,
{
    useState,
    useCallback,
} from "react";

// 2 ways to update the table:
// 1) using useStateful,useSetState and the setting of columns and data is in the table
// 2) using useState( [.. here is the setting of columns and data])

//-------------------------------------------------
//  modify hooks to use a callback like setState
//  emulate the behavior of the 'classic' setState()
//-------------------------------------------------

const useStateful = initial => {
    const [value, setValue] = useState(initial);
    // console.log(`useStateful CALLED BY SURPRIZE value`, value);
    return {
        value,
        setValue
    };
};

// Creates an statfull object
// having state and setState 
// 
// setState is a callBack with no dependencies, 
// which calls setValue with oldValue
// which is actually the new updated value
// since we pass v as ()=>resolve()
// resolve is called with the new value
// and tries to replace it with v (new value)
// or the result of the v function

const useSetState = initialValue => {
    const { value, setValue } = useStateful(initialValue);

    return {
        setState: useCallback(v => {
            return setValue(oldValue => ({
                // ...oldValue, /// this works badly on delete, 
                /// and without it, edit updates local_categories_list a bit longer
                ...(typeof v === 'function' ? v(oldValue) : v)
            }));
        }, []),
        state: value
    };
};



/*
const useSetState = initialValue => {
  const { value, setValue } = useStateful(initialValue);
  console.log(`====== CategoriesBrowser useSetState  value ==========\n`,value);
  console.log(`====== CategoriesBrowser useSetState  setValue ==========\n`,setValue);

  return {
    setState: useCallback(v => {
      console.log(`====== CategoriesBrowser useSetState setState useCallback v ==========\n`,v);

      return setValue((oldValue) => {

        console.log(`====== CategoriesBrowser useSetState setValue F oldValue ==========\n`,oldValue);
        console.log(`====== CategoriesBrowser useSetState setValue F  v ==========\n`,v);
       return(
          {
        ...oldValue,
        ...(typeof v === 'function' ? v(oldValue) : v)
       });
    });
    }, []),
    state: value,
  };
};
*/

export default useSetState;