import axios from 'axios';

export const getStudents = () => {
    return axios.get('http://siiga_backend.test/api/v1/students').then(response => response.data);
};

export const getStudentById = (id) => {
    return axios.get(`http://siiga_backend.test/api/v1/students/${id}`).then(response => response.data);
};

export const getUsers = () => {
    return axios.get('http://siiga_backend.test/api/v1/users').then(response => response.data);
};

export const getUserById = (id) => {
    return axios.get(`http://siiga_backend.test/api/v1/users/${id}`).then(response => response.data);
};

export const getPayments = () => {
    return axios.get('http://siiga_backend.test/api/v1/payments?include=student').then(response => response.data);
};

export const getPaymentById = (id) => {
    return axios.get(`http://siiga_backend.test/api/v1/payments/${id}?include=student.user`).then(response => response.data);
};

export const createUser = (userData) => {
    return axios.post('http://siiga_backend.test/api/v1/users', userData);
};

export const createStudent = (studentData) => {
    return axios.post('http://siiga_backend.test/api/v1/students', studentData);
};

export const createPayment = (paymentData) => {
    return axios.post('http://siiga_backend.test/api/v1/payments', paymentData);
};

export const updateUser = (userId, userData) => {
    const { email, password, ...updatedData } = userData;  
    return axios.put(`http://siiga_backend.test/api/v1/users/${userId}`, updatedData);
};

export const updateStudent = (studentId, studentData) => {
    const { ...updatedData } = studentData;  
    return axios.put(`http://siiga_backend.test/api/v1/students/${studentId}`, updatedData);
};

export const updatePayment = (paymentId, paymentData) => {
    const { ...updatedData } = paymentData;  
    return axios.put(`http://siiga_backend.test/api/v1/payments/${paymentId}`, updatedData);
};

export const deleteUser = (userId) => {
  return axios.delete(`http://siiga_backend.test/api/v1/users/${userId}`);
};

export const deleteStudent = (studentId) => {
    return axios.delete(`http://siiga_backend.test/api/v1/students/${studentId}`);
  };

export const deletePayment = (paymentId) => {
    return axios.delete(`http://siiga_backend.test/api/v1/payments/${paymentId}`);
};

export const getFullName = (person) => {
    if (person) {
        const { name, first_surname, second_surname } = person;
        return `${name} ${first_surname} ${second_surname}`;
    }
    return '';
};

export const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const formatDate = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

export const formatStatus = (status) => {
    switch (status) {
        case 'Active':
            return {
                text: 'Active',
                color: 'green',
                icon: 'fa fa-check-circle'
            };
        case 'Inactive':
            return {
                text: 'Inactive',
                color: 'red',
                icon: 'fa fa-times-circle'
            };
        case 'Under review':
            return {
                text: 'Under review',
                color: 'orange',
                icon: 'fa fa-exclamation-circle'
            };
        default:
            return {
                text: 'Unknown',
                color: 'black',
                icon: 'fa fa-question-circle'
            };
    }
};

export const formatCurrency = (amount) => {
    const formattedAmount = parseFloat(amount).toFixed(2);
    const parts = formattedAmount.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${parts.join('.')} MXN`;
};

export const formatGender = (gender) => {
    if (gender.toUpperCase() === 'F') {
        return 'Female';
    } else if (gender.toUpperCase() === 'M') {
        return 'Male';
    } else {
        return 'Unknown';
    }
};

export const filterPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    return formattedNumber;
};
