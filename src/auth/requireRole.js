import { redirect } from "react-router-dom";

export const requireRole = (allowedRole) => {
  return async ({ request }) => {
    const response = await fetch("http://localhost:4000/auth/me", {
      credentials: "include",
      cache: "no-store",
      signal: request.signal,
    });

    // No valid login cookie.
    if (response.status === 401) {
      return redirect("/");
    }

    if (!response.ok) {
      throw new Error("تعذر التحقق من تسجيل الدخول");
    }

    const { user } = await response.json();

    // Logged in, but trying to open the other role's page.
    if (user.role !== allowedRole) {
      if (user.role === "TEACHER") {
        return redirect("/teacher");
      }

      if (user.role === "STUDENT") {
        return redirect("/student");
      }

      return redirect("/");
    }

    return user;
  };
};