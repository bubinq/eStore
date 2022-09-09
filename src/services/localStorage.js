export async function setLocalStorage (data) {
    localStorage.setItem('cartStorage', JSON.stringify(data))
}