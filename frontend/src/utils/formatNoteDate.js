const formatNoteDate = (createdAt, updatedAt) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const date = updated > created ? updated : created;
  const now = new Date();

  const differenceInMs = now - date;
  const differenceInHours = differenceInMs / (1000 * 60 * 60);

  if (differenceInHours < 24) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  if (date >= oneYearAgo) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
    });
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default formatNoteDate;
