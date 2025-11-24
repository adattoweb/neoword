export function readLocal(key){
    if(localStorage.getItem(key) === null) return []
    let array = []
    try {
        array = JSON.parse(localStorage.getItem(key)) || []
    } catch {
        array = []
    }
    return array
}