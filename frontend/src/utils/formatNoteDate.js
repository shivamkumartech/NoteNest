const formatNoteDate = (createdAt, updatedAt) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const date = updated > created ? updated : created;
  const currentYear = new Date().getFullYear();

  return date.toLocaleDateString(
    "en-GB",
    date.getFullYear() === currentYear
      ? {
          day: "numeric",
          month: "short",
        }
      : {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
  );
};

export default formatNoteDate;
