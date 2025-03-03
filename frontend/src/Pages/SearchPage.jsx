// import { useState, useEffect,useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const SearchPage = () => {
//     const { auth } = useContext(AuthContext);
//     const [chefs, setChefs] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         // Fetch chefs from backend
//         const fetchChefs = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/users', {
//                     params: { role: 'chef' }
//                 });
//                 setChefs(response.data);
//             } catch (error) {
//                 console.error('Error fetching chefs:', error);
//             }
//         };
//         fetchChefs();
//     }, [auth]);

//     // Filter chefs based on search term
//     const filteredChefs = chefs.filter(chef =>
//         chef.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-3xl font-bold mb-8 text-center">Search for a Chef</h2>
//             <input
//                 type="text"
//                 placeholder="Search chef by name"
//                 className="flex w-full  p-2 border border-gray-300 rounded-md mb-4"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <a href="signup">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {filteredChefs.map((chef) => (

//                         <div key={chef._id} className="flex p-4 border border-gray-200 shadow-md rounded-md ">
//                             <Link to={chef._id}>
//                                 <h3 className="text-xl font-bold">{chef.name}</h3>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </a>
//         </div> 
//     )
// }
// export default SearchPage;
