import Swal from 'sweetalert2';

export const showUpdateSuccessMessage = (userName) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: `${userName} has been updated successfully.`,
  });
};

export const showCreateSuccessMessage = (userName) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: `${userName} has been created successfully.`,
  });
};

export const confirmDelete = (userName) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  };

export const showDeleteSuccessMessage = (userName) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: `${userName} has been deleted successfully.`,
  });
};

export const showErrorMessage = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: message,
  });
};

export const showLogoutSuccessMessage = (userName) => {
  Swal.fire({
    icon: 'success',
    title: 'Logged out successfully!',
    text: `${userName} have been logged out successfully.`,
  });
};