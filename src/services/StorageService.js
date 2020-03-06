//const data_url = "https://api.myjson.com/bins/yt3d9";
//const data_url = "https://api.myjson.com/bins/wzf3c";

const fetchAllProfiles1 = data_url => {
  console.log(`in Api fetchAllProfiles1`);

  console.log(`Api fetchAllProfiles1 calling fetch`);
  fetch(data_url)
    .then(res => {
      console.log(`Api fetchAllProfiles1 after fetch`);
      if (res.ok) {
        console.log(`Api fetchAllProfiles1 json OK`);
        console.log(res);
        // here we return a promise with json format
        return res.json();
      }
      throw new Error(
        `Api fetchAllProfiles1 Network Fetch response was not ok ${
          res.error.message
        }`
      );
    })
    // .then(data => {
    //   console.log(`2nd then fetchDataFromNetwork dataK`);
    //   console.table(data);
    //   return data;
    // })
    .catch(error => {
      console.error(`Api fetchAllProfiles1 failed: ${error.message}`);
      throw new Error(`Api fetchAllProfiles1 failed: ${error.message}`);
    });

  // Note: it's important to handle errors here
  // instead of a catch() block so that we don't swallow
  // exceptions from actual bugs in components
};

// a general promises API simulating network communication
const fetchAllProfiles2 = async data_url => {
  try {
    const res = await fetch(data_url);
    console.log(`Api fetchAllProfiles2 after fetch res`);
    console.log(res);

    console.log(`Api fetchAllProfiles2 BEFORE fetch json`);
    const json = await res.json();
    console.log(`Api fetchAllProfiles2 AFTER fetch json`);

    if (json) {
      console.log(`Api fetchAllProfiles2 after fetch json`);
      console.table(json);
      return json;
    } else {
      throw new Error(
        `Api fetchAllProfiles2 Network Fetch response was not ok : ${
          res.error.message
        }`
      );
    }
  } catch (error) {
    console.error(`Api fetchDataFromNetwork fetch op failed: ${error.message}`);
    throw new Error(
      `Api fetchDataFromNetwork fetch op failed: ${error.message}`
    );
  }
};

//export async function fetchAllProfiles3() {
async function fetchAllProfiles3(data_url) {
  const response = await fetch(data_url);
  if (!response.ok)
    throw new Error(`Api fetchAllProfiles3 failed: ${response.error.message}`);
  return await response.json();
}

//////////////////////////////////////////////////////////////////////////////
//                   Local Storage handlres
//////////////////////////////////////////////////////////////////////////////

//export async function fetchListLS(list_name) {
  const fetchListLS = async (list_name) => {
    let ls_list;

    try{
      const ls_list_Json = window.localStorage.getItem(list_name);
      ls_list = JSON.parse(ls_list_Json);
     
      const is_list_ok = (  typeof ls_list != "undefined" 
                            && ls_list != null  
                            && Array.isArray(ls_list) 
                            && ls_list.length != null  
                            && ls_list.length > 0 );
      if(!is_list_ok)
        throw new Error(`Api fetchListLS returned an empty list: ${ls_list_Json}`);
    } catch (err) {
      throw new Error(`Api fetchListLS: ${err}`);
    }

    return ls_list;
  }

//export async function storeListLS(list_name) {
  const storeListLS = async (list_name, list) => {

    console.log(`LOCAL STORAGE storeListLS GOT input list: `, list);

  try{    
    const is_list_ok = ( typeof list != "undefined"  
                        && list != null  
                        && Array.isArray(list) 
                        && list.length != null  
                        && list.length > 0 );
    
    const list_name_ok = ( typeof list_name != "undefined"  
                          && list_name != null  
                          && list_name.length != null  
                          && list_name.length > 0 );


    if(!is_list_ok && list_name_ok)
          throw new Error(`Api LOCAL STORAGE  storeListLS received empty list or list_name: ${list_name}`);

    const ls_list_json = JSON.stringify(list);
    window.localStorage.setItem(list_name, ls_list_json);  
    
    console.log(`LOCAL STORAGE storeListLS stored list: `, storeListLS);

  } catch (err) {
    throw new Error(`Api LOCAL STORAGE storeListLS: ${err}`);
  }

}


export { fetchAllProfiles1, fetchAllProfiles2, fetchAllProfiles3, fetchListLS, storeListLS };
