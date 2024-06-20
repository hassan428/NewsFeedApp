export const getErrorMessage = errorCode => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email address is already in use.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/weak-password':
      'The password is too weak. It must be at least 6 characters.',
    'auth/user-disabled': 'This user has been disabled.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password.',
  };
  return errorMessages[errorCode] || 'An unknown error occurred.';
};
