
export const user = {
  async role() {
    const response = await fetch("/api/user/role", { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch user role");
    const roles = await response.json();
    return roles;
  }
}