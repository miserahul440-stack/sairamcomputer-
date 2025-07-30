"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  Home,
  FileText,
  CreditCard,
  PhoneCall,
  Bell,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: string
}

interface Service {
  id: number
  icon: string
  name: string
  badge: string
  active: boolean
}

interface Services {
  government: Service[]
  digital: Service[]
}

export default function SairamComputerApp() {
  const [currentTime, setCurrentTime] = useState("")
  const [activeTab, setActiveTab] = useState("services")

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "🔥 नवीन सरकारी नोकरी!",
      message: "महाराष्ट्र पोलीस भरती 2024 - आज अर्ज करा!",
      time: "2 min ago",
      read: false,
      type: "job",
    },
    {
      id: 2,
      title: "📋 परीक्षा निकाल जाहीर",
      message: "SSC CGL 2024 निकाल आज संध्याकाळी 6 वाजता",
      time: "1 hour ago",
      read: false,
      type: "result",
    },
    {
      id: 3,
      title: "💰 नवीन शेतकरी योजना",
      message: "PM किसान योजनेचा नवा फेज सुरू - तातडीने अर्ज करा",
      time: "3 hours ago",
      read: true,
      type: "scheme",
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [services, setServices] = useState<Services>({
    government: [
      { id: 1, icon: "📋", name: "सरकारी नोकरी\nअपडेट्स", badge: "NEW", active: true },
      { id: 2, icon: "📊", name: "परीक्षा निकाल\n& Results", badge: "", active: true },
      { id: 3, icon: "🎫", name: "हॉल टिकिट\nDownload", badge: "", active: true },
      { id: 4, icon: "🌾", name: "शेतकरी योजना\n& Schemes", badge: "HOT", active: true },
    ],
    digital: [
      { id: 5, icon: "🖨️", name: "Print & Scan\nServices", badge: "", active: true },
      { id: 6, icon: "📸", name: "Photo Studio\n& Editing", badge: "", active: true },
      { id: 7, icon: "⌨️", name: "Typing &\nData Entry", badge: "", active: true },
      { id: 8, icon: "🎓", name: "Computer\nTraining", badge: "", active: true },
    ],
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      setCurrentTime(time)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const openService = (serviceName: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    const message = `🙏 नमस्कार राहुल जी!

साईराम कॉम्प्युटर App वरून संपर्क करत आहे.

📋 Service Required: ${serviceName}

कृपया यावर माहिती द्या:
• Service charges किती आहेत?
• काम पूर्ण होण्यासाठी किती वेळ लागेल?
• आवश्यक documents कोणते आहेत?
• कधी येऊन काम करवायचे?

Location: In front of Thakre Murtikar, Mangrulpir Road, Manora

धन्यवाद!`

    const whatsappUrl = `https://wa.me/919011083440?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const openWhatsApp = () => {
    const message = `🙏 नमस्कार राहुल जी!

साईराम कॉम्प्युटर च्या App वरून संपर्क करत आहे.

मला तुमच्या digital services बद्दल माहिती हवी आहे.
आपला professional app खूप छान आहे! 👍

Available services आणि charges बद्दल कृपया माहिती द्या.

Location: Mangrulpir Road, Manora

धन्यवाद!`

    const whatsappUrl = `https://wa.me/919011083440?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const makeCall = () => {
    window.location.href = "tel:9011083440"
  }

  const ServiceCard = ({
    icon,
    name,
    badge,
    onClick,
    badgeType = "new",
  }: {
    icon: string
    name: string
    badge?: string
    onClick: () => void
    badgeType?: "new" | "hot"
  }) => (
    <div className="service-card" onClick={onClick}>
      {badge && <div className={`service-badge ${badgeType === "hot" ? "hot-badge" : ""}`}>{badge}</div>}
      <span className="service-icon">{icon}</span>
      <div className="service-name">{name}</div>
    </div>
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const addNotification = (title: string, message: string, type = "info") => {
    const newNotification: Notification = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false,
      type,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const handleAdminLogin = () => {
    if (adminPassword === "sairam123") {
      setIsAdminLoggedIn(true)
      setShowAdmin(false)
      setAdminPassword("")
    } else {
      alert("गलत पासवर्ड!")
    }
  }

  const handleServiceEdit = (service: Service, category: string) => {
    setEditingService({ ...service, category })
  }

  const handleServiceSave = (updatedService: any) => {
    setServices((prev) => ({
      ...prev,
      [updatedService.category]: prev[updatedService.category as keyof Services].map((s) =>
        s.id === updatedService.id ? updatedService : s,
      ),
    }))
    setEditingService(null)
  }

  const handleServiceDelete = (serviceId: number, category: string) => {
    if (confirm("या service ला delete करायचे?")) {
      setServices((prev) => ({
        ...prev,
        [category]: prev[category as keyof Services].filter((s) => s.id !== serviceId),
      }))
    }
  }

  const addNewService = (category: string) => {
    const newService: Service = {
      id: Date.now(),
      icon: "🆕",
      name: "नवीन सेवा\nNew Service",
      badge: "",
      active: true,
    }
    setServices((prev) => ({
      ...prev,
      [category]: [...prev[category as keyof Services], newService],
    }))
    setEditingService({ ...newService, category })
  }

  return (
    <div className="container">
      {/* App Header */}
      <div className="app-header">
        <div className="status-bar">
          <span>{currentTime}</span>
          <span>📶 ⚡ 🔋100%</span>
        </div>
        <div className="header-content">
          <div className="app-logo">
            <div className="logo-content">
              <div className="logo-text-main">सा</div>
              <div className="logo-text-sub">COMPUTER</div>
            </div>
          </div>
          <div className="app-title">साईराम कॉम्प्युटर</div>
          <div className="app-subtitle">Digital Services & Internet Center</div>
          <div className="owner-info">Rahul Mise | 📞 9011083440</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <Home className="icon" size={22} />
          Home
        </button>
        <button className={`nav-tab ${activeTab === "forms" ? "active" : ""}`} onClick={() => setActiveTab("forms")}>
          <FileText className="icon" size={22} />
          Forms
        </button>
        <button
          className={`nav-tab ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          <CreditCard className="icon" size={22} />
          Documents
        </button>
        <button
          className={`nav-tab ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <PhoneCall className="icon" size={22} />
          Contact
        </button>
        <button className="nav-tab notification-tab" onClick={() => setShowNotifications(true)}>
          <div className="notification-icon-wrapper">
            <Bell className="icon" size={22} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          Alerts
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="tab-content">
            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>🚀 तातडीची सेवा Available</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={openWhatsApp}>
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp Now
                </button>
                <button className="action-btn phone" onClick={makeCall}>
                  <Phone size={18} className="mr-2" />
                  Call Direct
                </button>
              </div>
            </div>

            {/* Government Services */}
            <div className="service-section">
              <div className="section-header">
                <span className="section-icon">🏛️</span>
                <span className="section-title">सरकारी सेवा</span>
                {isAdminLoggedIn && (
                  <button className="admin-add-btn" onClick={() => addNewService("government")}>
                    <Plus size={16} />
                  </button>
                )}
              </div>
              <div className="services-grid">
                {services.government
                  .filter((s) => s.active)
                  .map((service) => (
                    <div key={service.id} className="service-card-wrapper">
                      <ServiceCard
                        icon={service.icon}
                        name={service.name}
                        badge={service.badge}
                        onClick={() => openService(service.name)}
                        badgeType={service.badge === "HOT" ? "hot" : "new"}
                      />
                      {isAdminLoggedIn && (
                        <div className="admin-controls">
                          <button onClick={() => handleServiceEdit(service, "government")}>
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleServiceDelete(service.id, "government")}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Digital Services */}
            <div className="service-section">
              <div className="section-header">
                <span className="section-icon">💻</span>
                <span className="section-title">डिजिटल सेवा</span>
                {isAdminLoggedIn && (
                  <button className="admin-add-btn" onClick={() => addNewService("digital")}>
                    <Plus size={16} />
                  </button>
                )}
              </div>
              <div className="services-grid">
                {services.digital
                  .filter((s) => s.active)
                  .map((service) => (
                    <div key={service.id} className="service-card-wrapper">
                      <ServiceCard
                        icon={service.icon}
                        name={service.name}
                        badge={service.badge}
                        onClick={() => openService(service.name)}
                        badgeType={service.badge === "HOT" ? "hot" : "new"}
                      />
                      {isAdminLoggedIn && (
                        <div className="admin-controls">
                          <button onClick={() => handleServiceEdit(service, "digital")}>
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleServiceDelete(service.id, "digital")}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Forms Tab */}
        {activeTab === "forms" && (
          <div className="tab-content">
            <div className="service-section">
              <div className="section-header">
                <span className="section-icon">📝</span>
                <span className="section-title">Online Form Services</span>
              </div>
              <div className="services-grid">
                <ServiceCard
                  icon="🏫"
                  name="महाविद्यालयीन\nफॉर्म भरणे"
                  onClick={() => openService("महाविद्यालयीन फॉर्म भरणे")}
                />
                <ServiceCard
                  icon="📚"
                  name="परीक्षा फॉर्म\n& Applications"
                  onClick={() => openService("परीक्षा फॉर्म भरणे")}
                />
                <ServiceCard
                  icon="💰"
                  name="शिष्यवृत्ती\nApplications"
                  badge="💰"
                  onClick={() => openService("शिष्यवृत्ती फॉर्म अप्लाई")}
                />
                <ServiceCard icon="💼" name="Job Application\nForms" onClick={() => openService("नोकरी अर्ज फॉर्म")} />
                <ServiceCard
                  icon="📄"
                  name="Income Certificate\nForm"
                  onClick={() => openService("इनकम सर्टिफिकेट फॉर्म")}
                />
                <ServiceCard
                  icon="📋"
                  name="Caste Certificate\nForm"
                  onClick={() => openService("कास्ट सर्टिफिकेट फॉर्म")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="tab-content">
            <div className="service-section">
              <div className="section-header">
                <span className="section-icon">🆔</span>
                <span className="section-title">Document Services</span>
              </div>
              <div className="services-grid">
                <ServiceCard
                  icon="🆔"
                  name="PAN Card\nAll Services"
                  badge="HOT"
                  badgeType="hot"
                  onClick={() => openService("PAN Card सर्व सेवा")}
                />
                <ServiceCard icon="👤" name="Aadhar Card\nServices" onClick={() => openService("Aadhar Card सेवा")} />
                <ServiceCard
                  icon="🏦"
                  name="PF Withdrawal\n& Services"
                  onClick={() => openService("PF Withdrawal सेवा")}
                />
                <ServiceCard icon="📜" name="प्रमाणपत्र\nसेवा" onClick={() => openService("प्रमाणपत्र सेवा")} />
                <ServiceCard icon="📘" name="Passport\nServices" onClick={() => openService("Passport सेवा")} />
                <ServiceCard
                  icon="🚗"
                  name="Driving License\nServices"
                  onClick={() => openService("Driving License सेवा")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="tab-content">
            {/* Business Information */}
            <div className="business-info">
              <h3>
                <MapPin className="inline mr-2" size={20} />
                साईराम कॉम्प्युटर
              </h3>
              <div className="business-address">
                <strong>Address:</strong>
                <br />
                In front of Thakre Murtikar,
                <br />
                Mangrulpir Road, Manora
                <br />
                <strong>Owner:</strong> Rahul Mise
              </div>
              <div className="business-hours">
                <h4>
                  <Clock className="inline mr-2" size={16} />
                  कामाचे तास
                </h4>
                <div className="hours-text">8:00 AM - 10:00 PM</div>
                <div className="text-sm mt-1 opacity-90">सोमवार ते रविवार</div>
              </div>
              <div className="action-buttons">
                <button className="action-btn" onClick={openWhatsApp}>
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp
                </button>
                <button className="action-btn phone" onClick={makeCall}>
                  <Phone size={18} className="mr-2" />
                  9011083440
                </button>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="service-section">
              <div className="section-header">
                <Star className="section-icon" size={26} />
                <span className="section-title">Our Specialities</span>
              </div>
              <div className="service-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🔥</span>
                  <span>
                    <strong>Daily Fresh Job Updates</strong> - सरकारी व प्रायव्हेट नोकऱ्या
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📋</span>
                  <span>
                    <strong>All Government Forms</strong> - Expert form filling service
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🖨️</span>
                  <span>
                    <strong>Print & Digital Services</strong> - High quality printing
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🆔</span>
                  <span>
                    <strong>Document Services</strong> - PAN, Aadhar, Passport, PF
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📸</span>
                  <span>
                    <strong>Photo Studio</strong> - Passport size photos & editing
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💡</span>
                  <span>
                    <strong>24/7 WhatsApp Support</strong> - तातडीच्या कामासाठी
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Safe Area */}
      <div className="bottom-spacer"></div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="notification-overlay">
          <div className="notification-panel">
            <div className="notification-header">
              <h3>🔔 Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <Bell size={48} className="opacity-30" />
                  <p>कोणतेही notifications नाहीत</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? "unread" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <button
                      className="delete-notification"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {isAdminLoggedIn && (
              <div className="admin-notification-controls">
                <button
                  className="add-notification-btn"
                  onClick={() => {
                    const title = prompt("Notification Title:")
                    const message = prompt("Notification Message:")
                    if (title && message) {
                      addNotification(title, message)
                    }
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Add Notification
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdmin && (
        <div className="admin-overlay">
          <div className="admin-modal">
            <div className="admin-header">
              <h3>🔐 Admin Login</h3>
              <button onClick={() => setShowAdmin(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="admin-form">
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              />
              <button onClick={handleAdminLogin}>Login</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Edit Modal */}
      {editingService && (
        <div className="admin-overlay">
          <div className="edit-modal">
            <div className="edit-header">
              <h3>✏️ Edit Service</h3>
              <button onClick={() => setEditingService(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="edit-form">
              <div className="form-group">
                <label>Icon (Emoji):</label>
                <input
                  type="text"
                  value={editingService.icon}
                  onChange={(e) => setEditingService((prev: any) => ({ ...prev, icon: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Service Name:</label>
                <textarea
                  value={editingService.name}
                  onChange={(e) => setEditingService((prev: any) => ({ ...prev, name: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Badge:</label>
                <select
                  value={editingService.badge}
                  onChange={(e) => setEditingService((prev: any) => ({ ...prev, badge: e.target.value }))}
                >
                  <option value="">No Badge</option>
                  <option value="NEW">NEW</option>
                  <option value="HOT">HOT</option>
                  <option value="💰">💰</option>
                </select>
              </div>
              <div className="form-actions">
                <button onClick={() => handleServiceSave(editingService)}>
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button onClick={() => setEditingService(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Toggle Button */}
      {!isAdminLoggedIn && (
        <button className="admin-toggle" onClick={() => setShowAdmin(true)}>
          <Settings size={20} />
        </button>
      )}

      {/* Admin Logout Button */}
      {isAdminLoggedIn && (
        <button
          className="admin-logout"
          onClick={() => {
            setIsAdminLoggedIn(false)
            setEditingService(null)
          }}
        >
          Admin Mode ON
        </button>
      )}
    </div>
  )
}
