import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Mock data structure for type safety and initial render
const MOCK_NOTICES = [
    { id: 'm1', title: 'Welcome Back!', content: 'A message from the administration to welcome students back for the new term.', category: 'admin', date: '2025-11-15' },
    { id: 'm2', title: 'Midterm Exam Schedule', content: 'The final schedule for midterms has been posted. Please review it carefully.', category: 'exam', date: '2025-11-10' },
    { id: 'm3', title: 'Annual Tech Fest Registration', content: 'Sign up for the biggest event of the year! Last date for registration is Nov 30th.', category: 'event', date: '2025-11-01' },
];

// Helper to assign icons based on category
const getIcon = (category) => {
    switch (category) {
        case 'academic': return '📚';
        case 'exam': return '📝';
        case 'event': return '🎉';
        case 'admin': return '🏛️';
        default: return '📢';
    }
};

// Custom Tailwind Configuration (Must be defined here to be sure)
// Note: In a real React app, this would be in tailwind.config.js, but for a single file, we can define a custom style object.
const customTailwindStyles = `
    .portal-primary { background-color: #7b2ff7; }
    .text-portal-primary { color: #7b2ff7; }
    .ring-portal-primary { --tw-ring-color: #7b2ff7; }
    .bg-portal-bg { background-color: #f7f9fc; }
    .shadow-notice { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
    .hover-scale { transform: scale(1.01); }
    .active-link { background-color: rgba(123, 47, 247, 0.15); color: #7b2ff7; font-weight: 700; }
`;

export default function NoticeBoard() {
    const [notices, setNotices] = useState(MOCK_NOTICES);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [db, setDb] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // 1. FIREBASE INITIALIZATION AND AUTHENTICATION
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const auth = getAuth(app);
            setDb(firestore);

            const authenticate = async () => {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            };
            
            // Set up auth state listener
            const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Use a random ID if anonymous sign-in failed or user logged out
                    setUserId(crypto.randomUUID()); 
                }
                setIsAuthReady(true);
            });

            authenticate();
            
            return () => unsubscribeAuth();
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(true); // Allow UI to load even if auth fails
        }
    }, []);

    // 2. FIREBASE REAL-TIME DATA LISTENER (ONSNAPSHOT)
    useEffect(() => {
        if (!isAuthReady || !db) return;

        // Public collection path: /artifacts/{appId}/public/data/notices
        const noticesCollectionPath = `artifacts/${appId}/public/data/notices`;
        const noticesRef = collection(db, noticesCollectionPath);
        
        // Query to order by date, fetching the most recent notices first (optional but good practice)
        const q = query(noticesRef, orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedNotices = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date instanceof Date ? doc.data().date.toISOString().split('T')[0] : doc.data().date, // Ensure date is string
            }));
            setNotices(fetchedNotices);
        }, (error) => {
            console.error("Error fetching notices:", error);
            // Optionally, show a user-friendly error message here
        });

        return () => unsubscribe();
    }, [isAuthReady, db]);


    // 3. FILTERING LOGIC (Computed Value)
    const filteredNotices = useMemo(() => {
        let currentNotices = notices;

        // 3a. Category Filter
        if (filterCategory !== 'all') {
            currentNotices = currentNotices.filter(notice => notice.category === filterCategory);
        }

        // 3b. Search Term Filter
        if (searchTerm.trim() !== '') {
            const lowerCaseSearch = searchTerm.toLowerCase().trim();
            currentNotices = currentNotices.filter(notice =>
                notice.title.toLowerCase().includes(lowerCaseSearch) ||
                notice.content.toLowerCase().includes(lowerCaseSearch)
            );
        }

        // Sort by date (already sorted by Firestore, but a client-side sort is a fallback)
        // currentNotices.sort((a, b) => new Date(b.date) - new Date(a.date));

        return currentNotices;
    }, [notices, filterCategory, searchTerm]);

    // 4. HANDLERS
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setFilterCategory(e.target.value);

    // 5. RENDER LOGIC
    return (
        <>
            {/* Inject custom styles for this Tailwind component */}
            <style>{customTailwindStyles}</style> 
            
            <div className="min-h-screen flex bg-portal-bg font-['Inter']">

                {/* NOTE: Sidebar is removed as it belongs to the main App wrapper, 
                   but we keep the styling here for context and a clean look if run stand-alone. */}
                
                <main className="content-area flex-1 lg:ml-64 p-4 md:p-8 w-full"> 
                    
                    {/* User ID display for collaborative context */}
                    <p className="text-gray-500 mb-2 text-sm">
                        <span className="font-semibold">User ID:</span> {userId || 'Authenticating...'}
                    </p>

                    {/* Header */}
                    <div className="bg-white p-6 rounded-xl shadow-notice mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Official Notice Board</h1>
                        <p className="text-gray-500 mt-1 text-sm">Latest Announcements & Circulars for Students</p>
                    </div>

                    {/* Filters and Search */}
                    <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <input 
                            type="text" 
                            id="search-input"
                            placeholder="Search by title or keyword..." 
                            className="flex-grow p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-portal-primary transition duration-150"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <select 
                            id="category-select"
                            className="p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-portal-primary transition duration-150"
                            value={filterCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="all">All Categories</option>
                            <option value="academic">Academic</option>
                            <option value="exam">Examination</option>
                            <option value="event">Events & Clubs</option>
                            <option value="admin">Administration</option>
                        </select>
                    </div>

                    {/* Notices Container */}
                    <div id="notices-container" className="space-y-6">
                        {filteredNotices.length > 0 ? (
                            filteredNotices.map((notice) => (
                                <div 
                                    key={notice.id} 
                                    className="bg-white p-6 rounded-xl shadow-notice border-l-4 border-portal-primary transition duration-300 hover:shadow-lg hover-scale"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{getIcon(notice.category)}</span>
                                            <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
                                        </div>
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                            notice.category === 'exam' ? 'bg-red-100 text-red-700' :
                                            notice.category === 'event' ? 'bg-yellow-100 text-yellow-700' :
                                            notice.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-4">{notice.content}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-400 border-t pt-3">
                                        <span>Posted: {notice.date}</span>
                                        <a href="#" className="text-portal-primary hover:underline font-medium">Read More &rarr;</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* No Notices Message */
                            <div id="no-notices-message" className="text-center py-12 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="mt-4 text-xl">No notices found matching your criteria.</p>
                                <p className="text-sm">Please try a different search or filter setting.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}