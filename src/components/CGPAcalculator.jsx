import React, { useState, useMemo } from 'react'; // Note: Added useMemo

function CGPACalculator() {
    // --- NEW STATE: Controls the number of subjects ---
    const [numSubjects, setNumSubjects] = useState(5); // Start with 5 subjects
    // ----------------------------------------------------

    const [marks, setMarks] = useState([]);
    const [result, setResult] = useState('');
    const [note, setNote] = useState('');
    const [isError, setIsError] = useState(false);

    // --- NEW FUNCTION: Initializes/Resets the marks array based on numSubjects ---
    const initializeMarks = (count) => {
        const newMarks = Array.from({ length: count }, (_, index) => ({
            id: index + 1,
            label: `Subject ${index + 1} Marks (Out of 50):`,
            value: '',
        }));
        setMarks(newMarks);
        // Clear results when subject count changes
        setResult('');
        setNote('');
        setIsError(false);
    };

    // --- NEW HOOK: Re-initialize marks whenever numSubjects changes ---
    // This is equivalent to componentDidMount and componentDidUpdate combined, but only for numSubjects
    useMemo(() => {
        initializeMarks(numSubjects);
    }, [numSubjects]);
    // -------------------------------------------------------------------


    const handleInputChange = (id, event) => {
        const newValue = event.target.value;
        setMarks(prevMarks =>
            prevMarks.map(subject =>
                subject.id === id ? { ...subject, value: newValue } : subject
            )
        );
        setResult('');
        setNote('');
        setIsError(false);
    };
// Inside CGPACalculator.jsx
const handleClear = () => {
    // Reset marks to empty state (re-use your initialization logic)
    initializeMarks(numSubjects); 
    setResult('');
    setNote('');
    setIsError(false);
};
    const calculateCGPA = () => {
        // Validation and Calculation logic remains mostly the same, 
        // but now the total marks depend on numSubjects.

        if (marks.some(s => s.value === '')) {
            setResult("Please fill all fields!");
            setNote("");
            setIsError(true);
            return;
        }

        const numericMarks = marks.map(s => Number(s.value));

        if (numericMarks.some(m => m > 50 || m < 0 || isNaN(m))) {
            setResult("Wrong marks entered! (0-50)");
            setNote("");
            setIsError(true);
            return;
        }

        const obtainedMarks = numericMarks.reduce((a, b) => a + b, 0);
        
        // --- UPDATED CALCULATION: Total marks are now dynamic ---
        const totalMarks = 50 * numSubjects; 
        const cgpa = ((obtainedMarks / totalMarks) * 10).toFixed(2);
        // --------------------------------------------------------

        let performanceNote = "";
        if (cgpa >= 9) performanceNote = "Excellent Performance!";
        else if (cgpa >= 7) performanceNote = "Good Performance!";
        else if (cgpa >= 5) performanceNote = "Satisfactory Performance!";
        else performanceNote = "Needs Improvement!";

        setResult(`Your CGPA: ${cgpa}`);
        setNote(performanceNote);
        setIsError(false);
    };

    return (
        <div className="main-content">
            <div className="calculator-container">
                <h3>CGPA Calculator</h3>
                
                {/* --- NEW INPUT FIELD FOR SUBJECT COUNT --- */}
                <div className="mb-3">
                    <label htmlFor="numSubjects" className="form-label">
                        Total Number of Subjects:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="numSubjects"
                        min="1"
                        max="10" // Set a reasonable maximum limit
                        value={numSubjects}
                        onChange={(e) => {
                            const count = Number(e.target.value);
                            if (count >= 1 && count <= 10) { // Safety check
                                setNumSubjects(count);
                            }
                        }}
                    />
                </div>
                {/* ------------------------------------------ */}
                
                {marks.map(subject => (
                    <div className="mb-3" key={subject.id}>
                        <label htmlFor={`subject${subject.id}`} className="form-label">
                            {subject.label} 
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id={`subject${subject.id}`}
                            min="0"
                            max="50"
                            value={subject.value}
                            onChange={(e) => handleInputChange(subject.id, e)}
                        />
                    </div>
                ))}

                <button onClick={calculateCGPA}>
                    Calculate CGPA
                </button>

                <div className="mt-4">
                    <h5 
                        id="result" 
                        className={`mt-4 ${isError ? 'error' : ''}`}
                    >
                        {result}
                    </h5>
                    <p id="note">{note}</p>
                </div>
            </div>
        </div>
    );
}

export default CGPACalculator;