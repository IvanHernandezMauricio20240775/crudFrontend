const Api_URL = "http://localhost:8080/CategoryActions";

export async function getCategory(){
 const res = await fetch(`${Api_URL}/GetPageCategory`)
 return res.json()
}

export async function CreateCategory(data) {
    await fetch(`${Api_URL}/InsertCategory`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    })
};

export async function UpdatedCategory(id, data) {
    await fetch(`${Api_URL}/updatedCategory/${id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    })
};

export async function DeleteCategory(id) {
    await fetch(`${Api_URL}/DeleteCategory/${id}`, {
      method: "DELETE"
    })
};