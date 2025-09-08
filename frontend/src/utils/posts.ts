export async function addPost(payload: { title: string; body: string; userId: string }) {
  const response = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  try {
    return await response.json(); 
  } catch {
    return { ...payload, id: Date.now().toString() };
  }
}