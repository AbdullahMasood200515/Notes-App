import './Sidebar.css';
import { FaTasks, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

function Sidebar({ currentFilter, setFilter, isOpen, onClose }) {
    const filters = [
        { id: 'all', label: 'All Tasks', icon: <FaTasks /> },
        { id: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
        { id: 'pending', label: 'Pending', icon: <FaRegCircle /> },
    ];

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-mobile-header">
                    <h3>Filters</h3>
                    <button className="close-sidebar-btn" onClick={onClose}>
                        <RxCross2 size={24} />
                    </button>
                </div>
                <div className="sidebar-nav">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
                            onClick={() => {
                                setFilter(filter.id);
                                if (window.innerWidth <= 1024) onClose();
                            }}
                        >
                            <span className="filter-icon">{filter.icon}</span>
                            <span className="filter-label">{filter.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Sidebar;