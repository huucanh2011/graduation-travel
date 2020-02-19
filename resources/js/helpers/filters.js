const dateFilter = value => {
  const date = new Date(value);
  return date.toLocaleString(["vi-VI"], {
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
};

const statusFilter = value => {
  return value ? "ACTIVATE" : "INACTIVATE";
};

const upperCaseFilter = value => {
  return value.toUpperCase();
};

const tagColorFilter = value => {
  const color = "cyan";
  if (value === "admin") {
    color = "orange";
  }
  if (value === "partner") {
    color = "green";
  }
  return color;
};

export { dateFilter, statusFilter, upperCaseFilter, tagColorFilter };
