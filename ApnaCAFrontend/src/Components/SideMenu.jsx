import { NavLink } from "react-router-dom";
import "../Css/SideMenu.css";

function SideMenu() {
    return (
        <aside className="apnaca-sidebar">

            {/* Brand */}
            <div className="sidebar-brand">
                <div className="brand-logo">A</div>

                <div>
                    <h2>ApnaCA</h2>
                    <p>Personal Finance</p>
                </div>
            </div>

            <div className="sidebar-section-title">
                MENU
            </div>

            {/* Navigation */}
            <nav className="sidebar-navigation">

                <NavLink 
                    to="/"
                    end
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>📊</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>🥧</span>
                    <span>Reports</span>
                </NavLink>

                <NavLink
                    to="/budgets"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>🎯</span>
                    <span>Budgets</span>
                </NavLink>

                <NavLink
                    to="/ai-budget-planner"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>🤖</span>
                    <span>AI Budget Planner</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>⚙️</span>
                    <span>Settings</span>
                </NavLink>

            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="sidebar-footer-icon">📈</div>
                <p>Manage your money smarter.</p>
                <span>Track. Save. Grow.</span>
            </div>

        </aside>
    );
}

export default SideMenu;