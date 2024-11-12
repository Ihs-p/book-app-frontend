const getImgUrl  = (name)=>{
    const url = new URL(`../assets/books/${name}`,import.meta.url)
    return url;
    
}

export {getImgUrl}
