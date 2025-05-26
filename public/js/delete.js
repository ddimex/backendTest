const deleteAcademy = async (academyId) => {
  try {
    const res = await axios.delete(`/academies/${academyId}`);
    if (res.status === 204) {
      document.getElementById(academyId).remove();
    } else {
      console.log("Failed to delete academy");
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      window.location.href = "/unauthorized";
    } else {
      console.log(err.message);
    }
  }
};

const deleteCourse = async (courseId) => {
  try {
    const res = await axios.delete(`/courses/${courseId}`);
    if (res.status === 204) {
      document.getElementById(courseId).remove();
    } else {
      console.log("Failed to delete course");
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      window.location.href = "/unauthorized";
    } else {
      console.log(err.message);
    }
  }
};
