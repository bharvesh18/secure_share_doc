# Secure Share Documents

- This app is designed so that users can store their documents which are protected by their email and security pin credential, here users can store their documents, view them download them or can even mail them to whomsoever needs them all with the help of the receiver's email ID.

## Functionalities

- **Register** - Allows a new user to register with a security pin
- **SignIn** - Allows a registered user to sign in
- **Upload Documents** - Once the user have signed in, the user can upload his/her documents from their device.
- **View Documents** - The user can view and download his uploaded documents.
- **Share Documents** - User can share the documents with other family members, friends, or colleaugues.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd <project-directory>
   ```

3. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```bash
   npm install
   ```

## Usage

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Open in Browser**

   Open your browser and navigate to `http://localhost:5172` to see the app in action.

## Components
  1. **Register** - Contains code to handle user regsitration.
  2. **Signin** - Contains code to sign in user
  3. **Navbar** - Display Username, sign-out options for user and for a new visitor shows signup and signin options. 
  4. **Home** - Have functionalities to upload documents,share documents, view documents.
  5. **Upload** - This component allow user to upload documents.
  6. **Store** - This component provide user with the functionality to view uploaded documents by downloading them and also provide a option to share it.
