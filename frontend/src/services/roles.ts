export const Role = {
  ADMIN: "ADMIN",
  LECTURER: "LECTURER",
  STUDENT: "STUDENT",
  GUEST: "GUEST",
  HOD: "HOD",
  ADMINISTRATOR: "ADMINISTRATOR"
} as const;

export type Role = typeof Role[keyof typeof Role];