import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Star,
  AlertTriangle,
  Users,
  Clock,
  Trophy,
  MapPin,
  Shield,
  UserPlus,
  Info,
  X,
  Music,
  Image,
  Maximize2,
  Minimize2,
  MessageSquare,
  Gift,
  Building,
  Compass,
  DollarSign,
  BarChart3,
  UserCheck,
  Video,
  Settings,
  Phone,
} from "lucide-react";
import "./App.css";

// Loading Component
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid rgba(25, 118, 210, 0.2)",
        borderTop: "3px solid #1976d2",
        borderRadius: "50%",
      }}
    />
  </motion.div>
);

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sections = [
    { id: "hero", title: "البداية" },
    { id: "situation", title: "الوضع الحالي" },
    { id: "problem", title: "المشكلة" },
    { id: "solution", title: "الحل" },
    { id: "timeline", title: "خطة التنفيذ" },
    { id: "phase1", title: "المرحلة الأولى" },
    { id: "phase2", title: "المرحلة الثانية" },
    { id: "schools-cup", title: "دوري المدارس" },
    { id: "stadium", title: "استاد بني سويف" },
    { id: "sphinx-army", title: "جيش أبو الهول" },
    { id: "ultras", title: "الأغاني والتيفوهات" },
    { id: "awareness", title: "حملات التوعية" },
    { id: "tickets", title: "التذاكر والعروض" },
    { id: "media", title: "المحتوى الإعلامي" },
    { id: "control-hub", title: "منصة الإدارة الذكية" },
    { id: "targets", title: "المستهدف" },
    { id: "structure", title: "الهيكل الإداري" },
    { id: "budget", title: "الميزانية" },
    { id: "thank-you", title: "شكراً لكم" },
  ];

  const goToSection = (index) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(Math.max(0, Math.min(sections.length - 1, index)));
    setTimeout(() => setIsScrolling(false), 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "n") {
        goToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "p") {
        goToSection(currentSection - 1);
      } else if (e.key === "Escape") {
        setModalData(null);
      } else if (e.key === "Home") {
        goToSection(0);
      } else if (e.key === "End") {
        goToSection(sections.length - 1);
      } else if (e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const openModal = (title, content) => {
    setModalData({ title, content });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Fullscreen toggle function
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.log("Error attempting to enable fullscreen:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.log("Error attempting to exit fullscreen:", err);
        });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{
          width: `${((currentSection + 1) / sections.length) * 100}%`,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          zIndex: 10000,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
        }}
      />

      {/* Header */}
      <motion.header
        className="site-header"
        initial={{ y: -100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <div className="logo-container">
          <motion.img
            src="/logo.png"
            alt="Pyramids FC Logo"
            className="logo floating"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 12,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 10,
              filter: "drop-shadow(0 0 40px rgba(100, 181, 246, 1))",
            }}
          />
          <motion.div
            className="sa3id-representative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              marginr: "15px",
              padding: "8px 16px",
              borderRadius: "20px",
              color: "#1976d2",
              fontSize: "0.9rem",
              fontWeight: "600",
              fontFamily:
                "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            ممثل الصعيد
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentSection === 0 && <HeroSection key="hero" />}
          {currentSection === 1 && (
            <SituationSection key="situation" openModal={openModal} />
          )}
          {currentSection === 2 && (
            <ProblemSection key="problem" openModal={openModal} />
          )}
          {currentSection === 3 && (
            <SolutionSection key="solution" openModal={openModal} />
          )}
          {currentSection === 4 && (
            <TimelineSection key="timeline" openModal={openModal} />
          )}
          {currentSection === 5 && (
            <Phase1Section key="phase1" openModal={openModal} />
          )}
          {currentSection === 6 && (
            <Phase2Section key="phase2" openModal={openModal} />
          )}
          {currentSection === 7 && (
            <SchoolsCupSection key="schools" openModal={openModal} />
          )}
          {currentSection === 8 && (
            <StadiumSection key="stadium" openModal={openModal} />
          )}
          {currentSection === 9 && (
            <SphinxArmySection key="sphinx" openModal={openModal} />
          )}
          {currentSection === 10 && (
            <UltrasSection key="ultras" openModal={openModal} />
          )}
          {currentSection === 11 && (
            <AwarenessSection key="awareness" openModal={openModal} />
          )}
          {currentSection === 12 && (
            <TicketsSection key="tickets" openModal={openModal} />
          )}
          {currentSection === 13 && (
            <MediaSection key="media" openModal={openModal} />
          )}
          {currentSection === 14 && (
            <ControlHubSection key="control-hub" openModal={openModal} />
          )}
          {currentSection === 15 && (
            <TargetsSection key="targets" openModal={openModal} />
          )}
          {currentSection === 16 && <StructureSection key="structure" />}
          {currentSection === 17 && <ThankYouSection key="thank-you" />}
          {currentSection === 18 && <BudgetSection key="budget" />}
        </AnimatePresence>
      </main>

      {/* Footer with Copyright */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          padding: "5px 0px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "25px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxWidth: "calc(100% - 48px)",
          textAlign: "center",
          zIndex: "9999",
          left: "1%",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#1976d2",
            fontSize: "0.7rem",
            fontWeight: "500",
            fontFamily:
              "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          جميع الحقوق محفوظة لشركة Q.S.T © 2025
        </p>
      </motion.footer>

      {/* Navigation */}
      <motion.div
        className="navigation"
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 1.5,
          type: "spring",
          stiffness: 150,
          damping: 12,
        }}
        style={{
          position: "fixed",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "15px 25px",
          borderRadius: "var(--border-radius-xl)",
          zIndex: 1000,
        }}
      >
        <motion.button
          className={`nav-btn ${currentSection === 0 ? "disabled" : ""}`}
          onClick={() => goToSection(currentSection - 1)}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSection === 0}
          style={{
            background: "var(--primary-gradient)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            fontSize: "20px",
            boxShadow: "var(--shadow-light)",
          }}
        >
          <ChevronUp size={24} />
        </motion.button>

        <div className="section-indicator">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`indicator-dot ${
                index === currentSection ? "active" : ""
              }`}
              onClick={() => goToSection(index)}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            />
          ))}
        </div>

        {/* Fullscreen Button */}
        <motion.button
          className="nav-btn"
          onClick={toggleFullscreen}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "var(--secondary-gradient)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            fontSize: "20px",
            boxShadow: "var(--shadow-light)",
          }}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </motion.button>

        <motion.button
          className={`nav-btn ${
            currentSection === sections.length - 1 ? "disabled" : ""
          }`}
          onClick={() => goToSection(currentSection + 1)}
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSection === sections.length - 1}
          style={{
            background: "var(--primary-gradient)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            fontSize: "20px",
            boxShadow: "var(--shadow-light)",
          }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            className="details-modal active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
              <h3>{modalData.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: modalData.content }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => (
  <motion.section
    className="section hero-section"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 1.2,
          staggerChildren: 0.4,
          delayChildren: 0.2,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: -50,
        transition: { duration: 0.6 },
      },
    }}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="hero-content">
      <motion.h1
        className="main-title"
        variants={{
          hidden: { y: 100, opacity: 0, scale: 0.8 },
          visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 12,
              duration: 1.5,
            },
          },
        }}
      >
        لماذا يحتاج بيراميدز إلى جماهير؟
      </motion.h1>

      <motion.p
        className="subtitle"
        variants={{
          hidden: { y: 50, opacity: 0, scale: 0.9 },
          visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.3,
              type: "spring",
              stiffness: 120,
              damping: 10,
            },
          },
        }}
      >
        وكيف يمكن لهذا المشروع أن يبني مستقبل النادي
      </motion.p>

      <motion.div
        className="scroll-indicator"
        variants={{
          hidden: { scale: 0, opacity: 0, rotate: -180 },
          visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          },
        }}
        whileHover={{
          scale: 1.2,
          rotate: 10,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  </motion.section>
);

// Situation Section Component
const SituationSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Star,
      title: "نادي قوي رياضيًا",
      text: "حقق بطولات، شارك في بطولات قارية، عنده لاعيبة مميزة.",
      details: `
        <p><strong>الإنجازات الرياضية:</strong></p>
        <ul>
          <li>بطل كأس مصر 2024</li>
          <li>بطل دوري أبطال أفريقيا 2025</li>
          <li>المشاركة في كاس العالم 2029</li>
          <li>لاعبين على مستوى عالي من الاحترافية</li>
          <li>إدارة رياضية متطورة</li>
        </ul>
      `,
    },
    {
      icon: AlertTriangle,
      title: "نجاحات بلا روح",
      text: "بدون جمهور حقيقي، النجاحات دي ملهاش القيمة الكاملة.",
      details: `
        <p><strong>التحديات الجماهيرية:</strong></p>
        <ul>
          <li>غياب الدعم الجماهيري في المباريات المهمة</li>
          <li>عدم وجود هوية جماهيرية واضحة</li>
          <li>ضعف الانتماء العاطفي للنادي</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "جمهور موسمي",
      text: "بيحضر وقت المكافآت والهدايا مش من الانتماء الحقيقي.",
      details: `
        <p><strong>خصائص الجمهور الحالي:</strong></p>
        <ul>
          <li>حضور مرتبط بالمكافآت المادية</li>
          <li>عدم الاستمرارية في الدعم</li>
          <li>غياب الولاء طويل المدى</li>
          <li>تأثر سريع بالنتائج السلبية</li>
          <li>عدم وجود رابطة عاطفية قوية</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/1.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          الوضع الحالي
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Problem Section Component
const ProblemSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: AlertTriangle,
      title: "هجوم إعلامي",
      text: "النادي بيتعرض لهجوم أو تقليل من الإعلام بسبب غياب ظهيره الجماهيري.",
      details: `
        <p><strong>التحديات الإعلامية:</strong></p>
        <ul>
          <li>تغطية إعلامية سلبية أو محدودة</li>
          <li>عدم وجود دفاع جماهيري قوي</li>
          <li>تأثير سلبي على صورة النادي</li>
          <li>صعوبة في مواجهة الانتقادات</li>
          <li>ضعف التأثير في الرأي العام</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "قوة المنافسين",
      text: "المنافسين (الأهلي – الزمالك) قوتهم مش في البطولات بس، قوتهم في إن معاهم ملايين من الجماهير تحميهم وتساندهم في كل موقف.",
      details: `
        <p><strong>مقارنة مع الأندية الكبيرة:</strong></p>
        <ul>
          <li>الأهلي والزمالك لديهم ملايين المشجعين</li>
          <li>دعم جماهيري في جميع المواقف</li>
          <li>تأثير قوي في الإعلام والرأي العام</li>
          <li>قوة اقتصادية من الجماهير</li>
          <li>حماية من الانتقادات والهجمات</li>
        </ul>
      `,
    },
    {
      icon: Shield,
      title: "الحاجة للحماية",
      text: "بيراميدز دلوقتي محتاج يبني أساس جماهيري يحمي نجاحه الرياضي والإداري.",
      details: `
        <p><strong>أهمية الحماية الجماهيرية:</strong></p>
        <ul>
          <li>حماية من الهجمات الإعلامية</li>
          <li>دعم في الأوقات الصعبة</li>
          <li>قوة تفاوضية أكبر</li>
          <li>استقرار مالي من الدعم الجماهيري</li>
          <li>بناء هوية قوية ومستدامة</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/2.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          المشكلة
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Solution Section Component
const SolutionSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Star,
      title: "بناء دائم",
      text: "مش حملة تسويقية مؤقتة، إحنا بنتكلم عن بناء قاعدة جماهيرية من الأطفال والشباب اللي هيفضلوا يشجعوا بيراميدز طول عمرهم.",
      details: `
        <p><strong>استراتيجية البناء طويل المدى:</strong></p>
        <ul>
          <li>استهداف الأطفال من سن 9-15 سنة</li>
          <li>بناء ذكريات وتجارب إيجابية</li>
          <li>خلق تقاليد جماهيرية جديدة</li>
          <li>تطوير الهوية البصرية والثقافية</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "أرض بكر",
      text: "الصعيد فيه أكثر من 15 مليون مواطن مفيش نادي بيمثلهم فعليًا، يعني عندك أرض بكر تبني عليها جمهور وفيّ.",
      details: `
        <p><strong>الفرصة الذهبية في الصعيد:</strong></p>
        <ul>
          <li>15 مليون مواطن في محافظات الصعيد</li>
          <li>عدم وجود تمثيل رياضي قوي</li>
          <li>رغبة في الانتماء لنادي يمثلهم</li>
          <li>إمكانيات اقتصادية متنامية</li>
          <li>حماس كبير للرياضة والكرة</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "جيل المستقبل",
      text: "المشروع ده بيخاطب الطفل اللي عمره 9 سنين واللي لما يكبر يبقى بيشجع بيراميدز مش الأهلي أو الزمالك.",
      details: `
        <p><strong>استهداف الجيل الجديد:</strong></p>
        <ul>
          <li>تشكيل الهوية الرياضية في سن مبكرة</li>
          <li>خلق ذكريات إيجابية مع النادي</li>
          <li>بناء ولاء يستمر مدى الحياة</li>
          <li>إنشاء جيل من المشجعين المتحضرين</li>
        </ul>
      `,
    },
    {
      icon: Shield,
      title: "ولاء حقيقي",
      text: "ده مشروع بيأسس الولاء الحقيقي، مش الجمهور الموسمي اللي بيتغير مع النتيجة.",
      details: `
        <p><strong>بناء الولاء الحقيقي:</strong></p>
        <ul>
          <li>ولاء مبني على التجربة والمشاركة</li>
          <li>استمرارية في الدعم في جميع الظروف</li>
          <li>انتماء عاطفي قوي للنادي</li>
          <li>مشاركة في النجاحات والإخفاقات</li>
          <li>تطوير تقاليد جماهيرية أصيلة</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/4.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          ليه المشروع ده هو الحل
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Timeline Section Component
const TimelineSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Star,
      title: "المرحلة الأولى: التأسيس",
      text: "السنة 1 - استهداف حضور من 3,000 إلى 7,000 مشجع فعلي في الاستاد",
      details: `
        <p><strong>أهداف المرحلة الأولى:</strong></p>
        <ul>
          <li>تأسيس أول قاعدة جماهيرية فعلية في الصعيد</li>
          <li>ربط اسم النادي بحياة الأطفال والشباب</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "المرحلة الثانية: التوسع",
      text: "السنة 2-3 - استهداف حضور من 14,000 إلى 21,000 مشجع فعلي في الاستاد",
      details: `
        <p><strong>أهداف المرحلة الثانية:</strong></p>
        <ul>
          <li>إنشاء شبكة أكاديميات رياضية متكاملة</li>
          <li>توسيع قاعدة المشاركين في دوري المدارس</li>
          <li>تعزيز الهوية الجماهيرية للنادي</li>
        </ul>
      `,
    },
    {
      icon: Trophy,
      title: "المرحلة الثالثة: التمكين",
      text: "السنة 4-5 - استهداف حضور من 30,000 إلى 45,000 مشجع فعلي في الاستاد",
      details: `
        <p><strong>أهداف المرحلة الثالثة:</strong></p>
        <ul>
          <li>تحقيق الاستدامة المالية للمشروع</li>
          <li>تمكين الجماهير من دعم النادي بفعالية</li>
          <li>تثبيت مكانة النادي كقوة جماهيرية</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/5ta.jpeg)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          خطة التنفيذ الزمنية لمشروع
        </motion.h2>

        <motion.p
          className="timeline-subtitle"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          🗓️ مدة المشروع: 5 سنوات - ينقسم إلى 3 مراحل رئيسية
        </motion.p>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Phase 1 Section Component
const Phase1Section = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Star,
      title: "تأسيس أول قاعدة جماهيرية فعلية",
      text: "لبيراميدز في الصعيد.",
      details: `
        <p><strong>خطة التأسيس:</strong></p>
        <ul>
          <li>إطلاق حملة إعلامية مكثفة في الصعيد</li>
          <li>تنظيم فعاليات تعريفية بالنادي</li>
          <li>تطوير الهوية البصرية المحلية</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "ربط اسم النادي",
      text: "مباشرة بحياة الأطفال والشباب وأسرهم في المحافظات المستهدفة.",
      details: `
        <p><strong>استراتيجية الربط المجتمعي:</strong></p>
        <ul>
          <li>برامج رياضية في المدارس</li>
          <li>فعاليات عائلية وترفيهية</li>
          <li>مشاركة في المناسبات المحلية</li>
          <li>دعم المبادرات المجتمعية</li>
          <li>خلق تجارب إيجابية مع العائلات</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/3.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          المرحلة الأولى : التأسيس (السنة 1)
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Phase 2 Section Component
const Phase2Section = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: MapPin,
      title: "4 أكاديميات رئيسية",
      text: "أسيوط، سوهاج، المنيا، بني سويف",
      details: `
        <p><strong>الأكاديميات الرئيسية:</strong></p>
        <ul>
          <li>أكاديمية أسيوط - تخدم جنوب الصعيد</li>
          <li>أكاديمية سوهاج - المركز الإقليمي</li>
          <li>أكاديمية المنيا - بوابة الصعيد</li>
          <li>أكاديمية بني سويف - الأقرب للقاهرة</li>
          <li>كل أكاديمية تخدم المحافظات المجاورة</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "4 أكاديمية فرعية",
      text: "اكاديمية فرعية في كل محافظة",
      details: `
        <p><strong>الشبكة الفرعية:</strong></p>
        <ul>
          <li>توزيع جغرافي متوازن</li>
          <li>تغطية شاملة لجميع المناطق</li>
          <li>سهولة الوصول للأطفال</li>
          <li>تنوع في المستويات والخدمات</li>
          <li>ربط مباشر بالأكاديمية الرئيسية</li>
        </ul>
      `,
    },
    {
      icon: Clock,
      title: "السن المستهدف",
      text: "9 – 15 سنة",
      details: `
        <p><strong>أهمية هذه المرحلة العمرية:</strong></p>
        <ul>
          <li>سن تشكيل الشخصية والانتماء</li>
          <li>قابلية عالية للتعلم والتطوير</li>
          <li>بناء عادات رياضية صحية</li>
          <li>تطوير المهارات الاجتماعية</li>
          <li>خلق ذكريات إيجابية مع النادي</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "اشتراك شهري",
      text: "100 جنيه (أول شهرين مجانًا)",
      details: `
        <p><strong>نظام الاشتراك:</strong></p>
        <ul>
          <li>سعر مدروس ومناسب للأسر</li>
          <li>شهرين مجانيين للتجربة</li>
          <li>خصومات للأشقاء</li>
          <li>برامج دعم للأسر المحتاجة</li>
          <li>مرونة في طرق الدفع</li>
        </ul>
      `,
    },
    {
      icon: Trophy,
      title: "الاشتراك يشمل",
      text: "زي رياضي كامل، حذاء رياضي، تدريب احترافي 3 أيام أسبوعيًا، وجبة غذاء صحية",
      details: `
        <p><strong>الخدمات المتكاملة:</strong></p>
        <ul>
          <li>زي رياضي كامل بشعار النادي</li>
          <li>حذاء رياضي عالي الجودة</li>
          <li>تدريب 3 أيام أسبوعيًا (6 ساعات)</li>
          <li>وجبة غذاء صحية متوازنة</li>
          <li>متابعة طبية دورية</li>
          <li>برامج تطوير المهارات</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/academya.jpeg)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          إنشاء الأكاديميات الرياضية
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Schools Cup Section Component
const SchoolsCupSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Star,
      title: "الرؤية",
      text: "إطلاق بطولة مدارس على مستوى محافظات الصعيد بنظام احترافي، تخلق روح التنافس والانتماء، وتجعل كل مدرسة تحلم ترفع كأس بيراميدز.",
      details: `
        <p><strong>رؤية البطولة:</strong></p>
        <ul>
          <li>بطولة احترافية على مستوى الصعيد</li>
          <li>خلق روح التنافس والانتماء</li>
          <li>ربط المدارس بالنادي بشكل مباشر</li>
          <li>تطوير المواهب الشابة</li>
          <li>بناء قاعدة جماهيرية قوية</li>
        </ul>
      `,
    },
    {
      icon: Trophy,
      title: "نظام البطولة",
      text: "كل مدرسة تنظم دورة داخلية، الفريق الفائز يمثل المدرسة، الفرق الفائزة تشارك في بطولة على مستوى المحافظة، أفضل الفرق من المحافظات تتأهل للنهائيات.",
      details: `
        <p><strong>مراحل البطولة:</strong></p>
        <ul>
          <li>دوريات داخلية في كل مدرسة</li>
          <li>تصفيات على مستوى المحافظة</li>
          <li>نهائيات على مستوى الصعيد</li>
          <li>حفل ختامي مميز</li>
          <li>تغطية إعلامية واسعة</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "الجوائز",
      text: "الفريق الفائز: كأس بيراميدز للمدارس، تيشيرتات أصلية، يوم كامل مع الفريق الأول، منح تدريبية مجانية. الفرق الوصيفة: ميداليات وجوائز رياضية.",
      details: `
        <p><strong>جوائز البطولة:</strong></p>
        <ul>
          <li>كأس بيراميدز للمدارس للفائز</li>
          <li>تيشيرتات أصلية للفريق الفائز</li>
          <li>يوم كامل مع الفريق الأول</li>
          <li>منح تدريبية مجانية</li>
          <li>ميداليات وجوائز للفرق الوصيفة</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "الأثر",
      text: "بناء ولاء حقيقي بين المدارس والنادي، كل طالب في الصعيد يحلم باللعب في بطولة بيراميدز، المدارس تتنافس للانتماء للنادي.",
      details: `
        <p><strong>الأثر المتوقع:</strong></p>
        <ul>
          <li>بناء ولاء حقيقي بين المدارس والنادي</li>
          <li>كل طالب يحلم باللعب في بطولة بيراميدز</li>
          <li>المدارس تتنافس للانتماء للنادي</li>
          <li>تطوير المواهب الشابة</li>
          <li>خلق قاعدة جماهيرية قوية</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/6.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          دوري المدارس (Pyramids Schools Cup)
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Stadium Section Component
const StadiumSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Trophy,
      title: "مباريات الفريق الأول",
      text: "استضافة مباريات الدوري والكؤوس",
      details: `
        <p><strong>استضافة المباريات الرسمية:</strong></p>
        <ul>
          <li>مباريات الدوري المصري الممتاز</li>
          <li>مباريات كأس مصر</li>
          <li>المباريات الودية والتحضيرية</li>
          <li>مباريات البطولات الأفريقية</li>
          <li>تقريب النادي من جماهير الصعيد</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "نهائيات دوري المدارس",
      text: "استضافة نهائيات بطولة المدارس السنوية",
      details: `
        <p><strong>الحدث الأكبر للمدارس:</strong></p>
        <ul>
          <li>نهائيات على مستوى الصعيد</li>
          <li>حفل افتتاح وختام مميز</li>
          <li>حضور نجوم الفريق الأول</li>
          <li>تغطية إعلامية واسعة</li>
          <li>تجربة لا تُنسى للطلاب</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "الفعاليات الجماهيرية",
      text: "استضافة الحفلات والمناسبات الخاصة بالنادي",
      details: `
        <p><strong>مركز الفعاليات الرياضية:</strong></p>
        <ul>
          <li>حفلات تقديم اللاعبين الجدد</li>
          <li>فعاليات توقيع العقود</li>
          <li>احتفالات البطولات</li>
          <li>مناسبات اجتماعية للجماهير</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/s.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          🏟️ إدارة واستغلال استاد بني سويف
        </motion.h2>

        <motion.p
          className="stadium-subtitle"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          المقر الرسمي لمباريات بيراميدز في الصعيد
        </motion.p>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Sphinx Army Section Component
const SphinxArmySection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Shield,
      title: "إطلاق الاسم والشعار",
      text: "الاسم: Sphinx Army، الشعار: أبو الهول بشكل حديث مع لون بيراميدز الأزرق.",
      details: `
        <p><strong>الهوية البصرية للرابطة:</strong></p>
        <ul>
          <li>الاسم: Sphinx Army (جيش أبو الهول)</li>
          <li>الشعار: أبو الهول بشكل حديث مع لون بيراميدز الأزرق</li>
          <li>الهوية البصرية: تصميم عصري يجمع بين التراث والحداثة</li>
          <li>الألوان: الأزرق بيراميدز مع لمسات ذهبية</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "تجهيز أدوات التشجيع",
      text: "تصميم وتوزيع: تيشيرتات خاصة بالرابطة (Sphinx Army)، أعلام وشعارات عليها أبو الهول وشعار النادي، سكارفات وأدوات تشجيع (طبلات – أبواق – بنرات).",
      details: `
        <p><strong>أدوات التشجيع المطلوبة:</strong></p>
        <ul>
          <li>تيشيرتات خاصة بالرابطة (Sphinx Army)</li>
          <li>أعلام وشعارات عليها أبو الهول وشعار النادي</li>
          <li>سكارفات بألوان النادي</li>
          <li>أدوات تشجيع (طبلات – أبواق – بنرات)</li>
          <li>قبعات وملابس رسمية للرابطة</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "إعداد الكابوهات",
      text: "اختيار شباب من كل محافظة ليكونوا قادة الرابطة، تدريبهم على تنظيم الهتافات والتشجيع الحضاري، توحيد الهتافات والشعارات الخاصة بالنادي.",
      details: `
        <p><strong>إعداد قادة الرابطة:</strong></p>
        <ul>
          <li>اختيار شباب من كل محافظة ليكونوا قادة الرابطة</li>
          <li>تدريبهم على تنظيم الهتافات والتشجيع الحضاري</li>
          <li>توحيد الهتافات والشعارات الخاصة بالنادي</li>
          <li>تطوير قواعد سلوكية للرابطة</li>
          <li>إنشاء هيكل تنظيمي للرابطة</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "تجهيز المدرج الخاص",
      text: "تخصيص أول مدرج رسمي للرابطة في المباريات بالصعيد، تنظيم سفر جماعي للرابطة في مباريات الفريق الأول.",
      details: `
        <p><strong>البنية التحتية للرابطة:</strong></p>
        <ul>
          <li>تخصيص أول مدرج رسمي للرابطة في المباريات بالصعيد</li>
          <li>تنظيم سفر جماعي للرابطة في مباريات الفريق الأول</li>
          <li>إنشاء مقر رسمي للرابطة في كل محافظة</li>
          <li>تطوير نظام عضوية للرابطة</li>
          <li>إنشاء قنوات تواصل رسمية</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/spinks.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          خطوات تأسيس التراس
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  {selected === 0 ? (
                    <img
                      src="/logo2.png"
                      alt="Sphinx Army Logo"
                      className="point-logo"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <selectedPoint.icon size={48} />
                  )}
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Awareness Campaigns Section Component
const AwarenessSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Users,
      title: "زيارات مفاجئة للنجوم",
      text: "تنظيم زيارات مفاجئة لنجوم بيراميدز لمدارس المحافظات.",
      details: `
        <p><strong>زيارات نجوم بيراميدز:</strong></p>
        <ul>
          <li>زيارات مفاجئة لنجوم الفريق الأول</li>
          <li>لقاءات مباشرة مع الطلاب</li>
          <li>جلسات توقيع وهدايا تذكارية</li>
          <li>صور جماعية وتفاعل مباشر</li>
          <li>تغطية إعلامية مكثفة للزيارات</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "لقاءات توعوية",
      text: "لقاءات مع الأطفال والشباب للحديث عن أهمية الرياضة والانتماء.",
      details: `
        <p><strong>اللقاءات التوعوية:</strong></p>
        <ul>
          <li>محاضرات عن أهمية الرياضة</li>
          <li>حديث عن الانتماء للنادي</li>
          <li>قصص نجاح اللاعبين</li>
          <li>تشجيع على ممارسة الرياضة</li>
          <li>توعية بقيم النادي وأهدافه</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "توزيع الكتيبات",
      text: "توزيع كتيبات تعريفية عن تاريخ النادي وقيمه.",
      details: `
        <p><strong>الكتيبات التعريفية:</strong></p>
        <ul>
          <li>كتيبات عن تاريخ النادي</li>
          <li>معلومات عن قيم وأهداف النادي</li>
          <li>قصص نجاح وإنجازات</li>
          <li>صور وألوان النادي</li>
          <li>معلومات عن الأكاديميات والبطولات</li>
        </ul>
      `,
    },
    {
      icon: Shield,
      title: "التغطية الإعلامية",
      text: "تغطية إعلامية مكثفة على السوشيال ميديا والميديا المحلية.",
      details: `
        <p><strong>التغطية الإعلامية:</strong></p>
        <ul>
          <li>تغطية مكثفة على السوشيال ميديا</li>
          <li>تقارير في الميديا المحلية</li>
          <li>فيديوهات قصيرة للأنشطة</li>
          <li>تفاعل مباشر مع الجماهير</li>
          <li>نشر قصص النجاح والتأثير</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/ra.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          ✅ حملات التوعية وزيارات المدارس
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Targets Section Component
const TargetsSection = ({ openModal }) => {
  const [animatedValues, setAnimatedValues] = useState({
    fans: 0,
    attendance: 0,
    engagement: 0,
    schools: 0,
    academies: 0,
    events: 0,
  });

  const targets = [
    {
      icon: Users,
      title: "المشجعين المستهدفين",
      target: 10000,
      current: 0,
      unit: "مشجع",
      color: "#1976d2",
      description: "مشجعين فعليين مرتبطين بالنادي بشكل دائم",
    },
    {
      icon: Star,
      title: "الحضور الفعلي",
      target: 3000,
      current: 0,
      unit: "مشجع",
      color: "#42a5f5",
      description: "يحضرون الفعاليات والمباريات بانتظام",
    },
    {
      icon: MapPin,
      title: "التفاعل الرقمي",
      target: 30,
      current: 0,
      unit: "%",
      color: "#64b5f6",
      description: "زيادة في التفاعل على السوشيال ميديا",
    },
    {
      icon: Trophy,
      title: "المدارس المشاركة",
      target: 100,
      current: 0,
      unit: "مدرسة",
      color: "#ffc107",
      description: "مدارس في محافظات الصعيد",
    },
    {
      icon: Shield,
      title: "الأكاديميات الرياضية",
      target: 8,
      current: 0,
      unit: "أكاديمية",
      color: "#ff9800",
      description: "أكاديميات بيراميدز في الصعيد",
    },
    {
      icon: Clock,
      title: "الفعاليات السنوية",
      target: 18,
      current: 0,
      unit: "فعالية",
      color: "#4caf50",
      description: "فعاليات وأنشطة شهرية",
    },
  ];

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setAnimatedValues((prev) => {
        const newValues = {};
        targets.forEach((target, index) => {
          const key = Object.keys(prev)[index];
          const progress = Math.min(
            (Date.now() - Date.now() + duration) / duration,
            1
          );
          newValues[key] = Math.floor(target.target * progress);
        });
        return newValues;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/15.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.5rem",
          }}
        >
          📊 المستهدف في نهاية السنة الأولى
        </motion.h2>

        <motion.div
          className="stats-grid"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
            padding: "15px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {targets.map((target, index) => (
            <motion.div
              key={index}
              className="stat-card enhanced-card"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                },
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "var(--shadow-medium)",
              }}
              style={{
                padding: "20px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                border: `2px solid ${target.color}20`,
              }}
            >
              {/* Background Pattern */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `radial-gradient(circle, ${target.color}10 0%, transparent 70%)`,
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: `${index * 0.5}s`,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                  className="stat-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto 12px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${target.color}, ${target.color}80)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    boxShadow: `0 6px 20px ${target.color}40`,
                  }}
                >
                  <target.icon size={30} />
                </motion.div>

                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "12px",
                    color: target.color,
                    fontWeight: "700",
                  }}
                >
                  {target.title}
                </h3>

                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: "900",
                    color: target.color,
                    marginBottom: "5px",
                    textShadow: `0 2px 10px ${target.color}30`,
                  }}
                >
                  {animatedValues[
                    Object.keys(animatedValues)[index]
                  ]?.toLocaleString() || 0}
                  <span style={{ fontSize: "1.2rem", marginLeft: "5px" }}>
                    {target.unit}
                  </span>
                </motion.div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.4",
                    marginTop: "8px",
                  }}
                >
                  {target.description}
                </p>

                {/* Progress Bar */}
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 1, duration: 1 }}
                  style={{
                    height: "3px",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "2px",
                    marginTop: "12px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 1.5, duration: 1.5 }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${target.color}, ${target.color}80)`,
                      borderRadius: "2px",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Card */}
        <motion.div
          className="summary-card enhanced-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            marginTop: "30px",
            padding: "25px",
            textAlign: "center",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              color: "#1976d2",
              marginBottom: "15px",
              fontWeight: "700",
            }}
          >
            🎯 الهدف العام
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#555",
            }}
          >
            بناء قاعدة جماهيرية قوية ومخلصة لنادي بيراميدز في الصعيد، مع خلق جيل
            جديد من المشجعين المتحمسين والمتفاعلين مع النادي
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Tickets and Offers Section Component
const TicketsSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Shield,
      title: "تذاكر العائلات",
      text: "تذاكر مخفضة للعائلات بحد أقصى 4 أفراد لأولاد الأكاديميات مع النقل ذهاب وعودة.",
      details: `
        <p><strong>تذاكر العائلات المميزة:</strong></p>
        <ul>
          <li>تذكرة ب 50 جنيه للأسرة (حد أقصى 4 أفراد)</li>
          <li>مخصصة لأولاد الأكاديميات وعائلاتهم</li>
          <li>تشمل النقل ذهاب وعودة للاستاد</li>
          <li>تعتبر كفسحة للعائلة</li>
          <li>تقوي العلاقة بين الجماهير والنادي</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "تذاكر الصور مع اللاعبين",
      text: "تذاكر مع إمكانية التقاط صور مع اللاعبين المفضلين.",
      details: `
        <p><strong>تذاكر الصور المميزة:</strong></p>
        <ul>
          <li>تذكرة ب 75 جنيه + صورة مع لاعب واحد</li>
          <li>تذكرة ب 100 جنيه + صورة مع لاعبين (يختارهم المشجع)</li>
          <li>تشيرتات ممضاة من نجم المفضل</li>
          <li>ستارز لعب بيه بعد المباراة</li>
          <li>ترابط بين اللاعبين والشباب والعائلات</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "البكجات المميزة",
      text: "بكجات متنوعة تشمل تشيرتات ممضاة وهدايا من نجوم الفريق.",
      details: `
        <p><strong>البكجات المميزة:</strong></p>
        <ul>
          <li>تشيرتات ممضاة من نجم المفضل</li>
          <li>ستارز لعب بيه بعد المباراة</li>
          <li>هدايا من نجوم الفريق</li>
          <li>بكجات متنوعة للعائلات</li>
          <li>عروض خاصة للأطفال والشباب</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "التسويق والتسهيلات",
      text: "تسويق العروض عبر السوشيال ميديا وتسهيل عملية الشراء أونلاين.",
      details: `
        <p><strong>التسويق والتسهيلات:</strong></p>
        <ul>
          <li>تسويق العروض عبر السوشيال ميديا</li>
          <li>إعلانات بفيديوهات يشارك فيها أطفال الأكاديمية</li>
          <li>تسهيل عملية شراء التذاكر أونلاين</li>
          <li>توسيع أماكن البيع</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/tza.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          🎫 التذاكر المخفضة والعروض المميزة
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Media Content Development Section Component
const MediaSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: Shield,
      title: "إنتاج المحتوى الوثائقي",
      text: "اتفاق مع شركة إنتاج إعلامي لإنتاج محتوى وثائقي عن إنجازات النادي خلال السنة.",
      details: `
        <p><strong>إنتاج المحتوى الوثائقي:</strong></p>
        <ul>
          <li>اتفاق مع شركة إنتاج إعلامي متخصصة</li>
          <li>محتوى وثائقي عن إنجازات النادي خلال السنة</li>
          <li>مشاركة الأطفال في المحتوى الوثائقي</li>
          <li>بيع المحتوى لمنصات مثل WatchIt أو شاهد</li>
          <li>مقارنة بوثائقيات All or Nothing لنتفلكس</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "مشاهد من الأنشطة",
      text: "تصوير مشاهد من الدورات المدرسية وزيارات الأطفال لتدريبات اللاعبين وعرضها علي السوشيال ميديا بتاعت النادي.",
      details: `
        <p><strong>مشاهد من الأنشطة المختلفة:</strong></p>
        <ul>
          <li>مشاهد من الدورات المدرسية</li>
          <li>زيارات الأطفال لتدريبات اللاعبين</li>
          <li>مقابلات الأطفال مع اللاعبين والمدربين</li>
          <li>مقابلات مع الإدارة</li>
          <li>توثيق جميع الأنشطة والفعاليات</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "البث والتوزيع",
      text: "بث الوثائقيات على القنوات التلفزيونية ومنصات الإنترنت.",
      details: `
        <p><strong>البث والتوزيع الإعلامي:</strong></p>
        <ul>
          <li>بث الوثائقيات على القنوات التلفزيونية</li>
          <li>عرض المحتوى على منصات الإنترنت</li>
          <li>توزيع نسخ من الوثائقي للمشجعين</li>
          <li>إتاحة المحتوى عبر المنصات الرقمية</li>
          <li>تسويق المحتوى عبر السوشيال ميديا</li>
        </ul>
      `,
    },
    {
      icon: MapPin,
      title: "التأثير والنتائج",
      text: "زيادة الوعي بالنادي وتوثيق الإنجازات وخلق محتوى إعلامي قوي.",
      details: `
        <p><strong>التأثير والنتائج المتوقعة:</strong></p>
        <ul>
          <li>زيادة الوعي بالنادي وإنجازاته</li>
          <li>توثيق شامل لجميع الأنشطة</li>
          <li>خلق محتوى إعلامي قوي ومؤثر</li>
          <li>عرض النادي بشكل احترافي</li>
          <li>جذب انتباه الجماهير والإعلام</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/a3l.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          📺 تطوير المحتوى الإعلامي
        </motion.h2>

        <div className="situation-layout">
          <div className="situation-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="point-icon">
                  <selectedPoint.icon size={48} />
                </div>
                <h3>{selectedPoint.title}</h3>
                <p>{selectedPoint.text}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="situation-nav">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <strong>{point.title}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Control Hub Section Component
const ControlHubSection = ({ openModal }) => {
  const [selected, setSelected] = useState(0);
  const points = [
    {
      icon: MapPin,
      title: "تتبع التنفيذ",
      text: "راقب تقدم المشروع لحظيًا في كل محافظة وأكاديمية ومدرسة مع مخطط زمني تفاعلي.",
      details: `
        <ul style='padding-right:18px;'>
          <li>مخطط زمني تفاعلي لكل مرحلة</li>
          <li>قائمة مهام تنفيذية قابلة للمتابعة</li>
          <li>مؤشرات أداء لحظية</li>
          <li>تقارير فورية عن حالة التنفيذ</li>
        </ul>
      `,
    },
    {
      icon: Users,
      title: "تنظيم الترحال",
      text: "جدولة وتنظيم رحلات المشجعين تلقائيًا.",
      details: `
        <ul style='padding-right:18px;'>
          <li>تسجيل بيانات الجماهير</li>
          <li>تنظيم الرحلات من المحافظات للاستاد</li>
          <li>إدارة روابط التشجيع (Sphinx Army)</li>
          <li>تتبع أعداد المشاركين</li>
        </ul>
      `,
    },
    {
      icon: Shield,
      title: "إدارة الرابطة",
      text: "تقسيم وتقييم المجموعات التشجيعية حسب المحافظات.",
      details: `
        <ul style='padding-right:18px;'>
          <li>تقييم النشاط والفاعلية</li>
          <li>إدارة العضوية والاشتراكات</li>
          <li>متابعة مشاركة الأعضاء</li>
          <li>تقارير أداء للمجموعات</li>
        </ul>
      `,
    },
    {
      icon: Star,
      title: "لوحة التحكم",
      text: "عرض بيانات فورية ومؤشرات أداء رئيسية.",
      details: `
        <ul style='padding-right:18px;'>
          <li>إحصائيات المشجعين والمدارس والأكاديميات</li>
          <li>تحليل الأداء بين المحافظات</li>
          <li>تتبع الميزانية والإنفاق</li>
        </ul>
      `,
    },
    {
      icon: Clock,
      title: "أرشفة رقمية",
      text: "توثيق ومشاركة العقود والتقارير بأمان.",
      details: `
        <ul style='padding-right:18px;'>
          <li>أرشفة العقود والخطط والتقارير</li>
          <li>مشاركة آمنة مع المستثمرين والرعاة</li>
          <li>تقارير تلقائية أسبوعية وشهرية</li>
          <li>قرارات أسرع وأكثر تنظيما</li>
        </ul>
      `,
    },
    {
      icon: MessageSquare,
      title: "تقيمات وشكاوي اللاعبين",
      text: "نظام متكامل لتقييم أداء اللاعبين واستقبال شكاويهم.",
      details: `
        <ul style='padding-right:18px;'>
          <li>استقبال شكاوي اللاعبين وتتبعها</li>
          <li>تقييم أداء اللاعبين من المدربين</li>
          <li>تقارير دورية عن مستوى اللاعبين</li>
          <li>نظام تنبيهات للشكاوي العاجلة</li>
        </ul>
      `,
    },
    {
      icon: Gift,
      title: "مكافآت الأكاديمية",
      text: "نظام مكافآت للاعبين الأكاديمية حسب تقييم المدربين.",
      details: `
        <ul style='padding-right:18px;'>
          <li>تقييم دوري من المدربين للاعبين</li>
          <li>نظام نقاط ومكافآت حسب الأداء</li>
          <li>جوائز شهرية للاعبين المتميزين</li>
          <li>تقارير تفصيلية عن التقدم</li>
        </ul>
      `,
    },
  ];

  const selectedPoint = points[selected];

  const handleItemClick = (index) => {
    console.log("Clicked item:", index, points[index].title);
    setSelected(index);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/6.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "2.5rem",
            letterSpacing: "1px",
          }}
        >
          🖥️ Pyramids Control Hub – منصة الإدارة الذكية
        </motion.h2>
        <div
          style={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: 600,
            fontSize: "15px",
            marginBottom: "18px",
            letterSpacing: "0.2px",
          }}
        >
          منصة رقمية لإدارة مشروع التحول الجماهيري لنادي بيراميدز بالصعيد
        </div>
        <motion.div
          className="control-hub-layout"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "0px",
            width: "100%",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Right Navigation (first 4 points) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              flex: "0 0 160px",
              gap: "8px",
              paddingTop: "10px",
            }}
          >
            {points.slice(0, 4).map((point, index) => (
              <motion.div
                key={index}
                className={`situation-nav-item ${
                  selected === index ? "active" : ""
                }`}
                onClick={() => setSelected(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  background:
                    selected === index ? "rgba(25,118,210,0.08)" : "none",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className="point-icon">
                  <point.icon size={24} />
                </div>
                <span style={{ fontSize: "15px", fontWeight: 700 }}>
                  {point.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Center Content */}
          <div
            style={{
              flex: "1 1 0",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="situation-content-inner enhanced-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                style={{
                  padding: "28px 32px 22px 32px",
                  minWidth: "320px",
                  maxWidth: "480px",
                  textAlign: "center",
                }}
              >
                <div className="point-icon" style={{ marginBottom: "8px" }}>
                  <selectedPoint.icon size={32} />
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    marginBottom: "7px",
                    color: "#1976d2",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {selectedPoint.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {selectedPoint.text}
                </p>
                <div
                  style={{
                    fontSize: "14px",
                    textAlign: "right",
                    direction: "rtl",
                    marginTop: "8px",
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedPoint.details }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Navigation (last 3 points) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: "0 0 160px",
              gap: "8px",
              paddingTop: "10px",
            }}
          >
            {points.slice(4).map((point, idx) => {
              const index = idx + 4;
              return (
                <motion.div
                  key={index}
                  className={`situation-nav-item ${
                    selected === index ? "active" : ""
                  }`}
                  onClick={() => setSelected(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    background:
                      selected === index ? "rgba(25,118,210,0.08)" : "none",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div className="point-icon">
                    <point.icon size={24} />
                  </div>
                  <span style={{ fontSize: "15px", fontWeight: 700 }}>
                    {point.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Structure Section Component
const StructureSection = () => {
  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/nas.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.1 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.5rem",
            background: "linear-gradient(135deg, #64b5f6, #1976d2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "bold",
          }}
        >
          الهيكل الإداري للمشروع
        </motion.h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* First Section - Pyramids Representatives */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              minWidth: "350px",
              maxWidth: "400px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "10px",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                أولاً: ممثلو نادي بيراميدز داخل المشروع
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Users size={20} style={{ color: "#4caf50" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مشرف عام على المشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Users size={20} style={{ color: "#4caf50" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مسؤول علاقات عامة
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Users size={20} style={{ color: "#4caf50" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مراقب مالي على المشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Users size={20} style={{ color: "#4caf50" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مشرف على رابطة الجماهير (Sphinx Army)
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Users size={20} style={{ color: "#4caf50" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مشرف على ميديا المشروع
                </span>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: "rgba(76,175,80,0.1)",
                borderRadius: "10px",
                border: "1px solid rgba(76,175,80,0.3)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                مرتبهم خارج ميزانية المشروع
              </span>
            </div>
          </motion.div>

          {/* Second Section - Company Team */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              minWidth: "350px",
              maxWidth: "400px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "10px",
                  color: "#ff9800",
                  fontWeight: "bold",
                }}
              >
                ثانياً: فريق إدارة الشركة المنفذة للمشروع
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Building size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير المشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Compass size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  عدد (2) مشرف عام على المشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <DollarSign size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير مالي للمشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <BarChart3 size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  محاسب قانوني للمشروع
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <UserCheck size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير الأكاديميات
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Video size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير المحتوى الإعلامي
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Settings size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير العمليات
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Phone size={20} style={{ color: "#ff9800" }} />
                <span style={{ color: "white", fontSize: "15px" }}>
                  مدير علاقات عامة
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Budget Section Component
const BudgetSection = () => {
  const [countedTotal, setCountedTotal] = useState(0);

  useEffect(() => {
    const totalCost = budgetItems.reduce(
      (sum, item) => sum + parseInt(item.cost.replace(/,/g, "")),
      0
    );

    const timer = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = totalCost / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= totalCost) {
          setCountedTotal(totalCost);
          clearInterval(interval);
        } else {
          setCountedTotal(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  const budgetItems = [
    {
      icon: "✅",
      title: "إشراف الشركة على المشروع",
      cost: "600,000",
      notes: "مرتب فريق الإدارة والتخطيط المركزي",
      color: "#4caf50",
    },
    {
      icon: "✅",
      title: "تكاليف الأكاديميات (تشغيل)",
      cost: "240,000",
      notes: "رواتب مدربين، مشرفين، عمال، حملات تسويقية للأكاديميات",
      color: "#2196f3",
    },
    {
      icon: "🏗️",
      title: "إنشاء وتجهيز ملاعب الأكاديميات",
      cost: "250,000",
      notes: "شِرَاء الملاعب، التجهيزات الأولية، صيانة البنية التحتية",
      color: "#ff9800",
    },
    {
      icon: "👕",
      title: "لبس كامل للاعبين",
      cost: "24,000",
      notes: "تيشيرت – شورت – شراب – حذاء",
      color: "#9c27b0",
    },
    {
      icon: "🍽️",
      title: "تغذية اللاعبين",
      cost: "172,000",
      notes: "وجبات يومية متكاملة",
      color: "#f44336",
    },
    {
      icon: "🎉",
      title: "تنظيم الفعاليات (Events)",
      cost: "25,000",
      notes: "أيام مفتوحة – زيارات مفاجئة للمدارس",
      color: "#e91e63",
    },
    {
      icon: "🏆",
      title: "دوري المدارس + جوائز",
      cost: "15,000",
      notes: "جوائز – ميداليات – دعم لوجستي",
      color: "#ffc107",
    },
    {
      icon: "🧢",
      title: "التراس ومعداته",
      cost: "76,000",
      notes: "معدات تشجيع – أعلام – تصميم هوية رابطة",
      color: "#795548",
    },
    {
      icon: "🚍",
      title: "تنقلات الأهالي والجمهور",
      cost: "55,000",
      notes: "باصات من المحافظات إلى الاستاد",
      color: "#607d8b",
    },
    {
      icon: "🎥",
      title: "محتوى إعلامي",
      cost: "250,000",
      notes: "تصوير – منتجة – حملات رقمية",
      color: "#3f51b5",
    },
    {
      icon: "📱",
      title: "تطبيق إلكتروني + صيانة",
      cost: "100,000",
      notes: "أداة لإدارة المشروع ومتابعته لحظة بلحظة",
      color: "#009688",
    },
    {
      icon: "🎫",
      title: 'نسبة "تذكرتي"',
      cost: "26,000",
      notes: "النسبة المستحقة من التذاكر وفق اتفاق مسبق",
      color: "#673ab7",
    },
  ];

  const totalCost = budgetItems.reduce(
    (sum, item) => sum + parseInt(item.cost.replace(/,/g, "")),
    0
  );

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.1 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "5px",
            fontSize: "2rem",
            background: "linear-gradient(135deg, #64b5f6, #1976d2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "bold",
          }}
        >
          الميزانية النهائية للمرحله الاولي لمشروع جماهيرية بيراميدز بالصعيد
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "15px",
                background: "rgba(25,118,210,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(25,118,210,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                البند
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "15px",
                background: "rgba(25,118,210,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(25,118,210,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                💰 التكلفة (دولار)
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "15px",
                background: "rgba(25,118,210,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(25,118,210,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                📝 الملاحظات
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "15px",
                background: "rgba(25,118,210,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(25,118,210,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                النسبة
              </div>
            </div>
          </div>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {budgetItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "15px",
                  padding: "12px",
                  marginBottom: "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  border: `2px solid ${item.color}20`,
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 12px 35px ${item.color}30`,
                  borderColor: item.color,
                  y: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  {item.title}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: item.color,
                  }}
                >
                  ${item.cost}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.4",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item.notes}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <div style={{ marginBottom: "5px" }}>
                    {(
                      (parseInt(item.cost.replace(/,/g, "")) / totalCost) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (parseInt(item.cost.replace(/,/g, "")) / totalCost) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    style={{
                      height: "4px",
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                      borderRadius: "2px",
                      margin: "0 auto",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="pulse"
            style={{
              background: "linear-gradient(135deg, #1976d2, #64b5f6)",
              borderRadius: "20px",
              padding: "25px 35px",
              textAlign: "center",
              color: "white",
              boxShadow: "0 20px 50px rgba(25,118,210,0.4)",
              border: "2px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(15px)",
              minWidth: "280px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                opacity: 0.9,
                fontWeight: "600",
              }}
            >
              إجمالي الميزانية
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              ${countedTotal.toLocaleString()}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="pulse"
            style={{
              background: "linear-gradient(135deg, #4caf50, #66bb6a)",
              borderRadius: "20px",
              padding: "25px 35px",
              textAlign: "center",
              color: "white",
              boxShadow: "0 20px 50px rgba(76,175,80,0.4)",
              border: "2px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(15px)",
              minWidth: "280px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                opacity: 0.9,
                fontWeight: "600",
              }}
            >
              الفائض عن 2 مليون
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              ${(2000000 - countedTotal).toLocaleString()}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "rgba(255,255,255,0.9)",
            fontSize: "15px",
            lineHeight: "1.6",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{ fontWeight: "600", marginBottom: "8px", color: "#4caf50" }}
          >
            📋 سياسة إدارة الفائض
          </div>
          <div>
            هذا الفائض متروك لحالات الطوارئ في المرحلة الأولى، وفي نهاية المرحلة
            يتم توزيع الفائض على مسولين علي المشروع كمكافآت
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Ultras Section Component
const UltrasSection = () => {
  const [showAudio, setShowAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTifoModal, setShowTifoModal] = useState(false);
  const [currentTifoIndex, setCurrentTifoIndex] = useState(0);
  const audioRef = React.useRef(null);

  const tifoImages = [
    {
      src: "/tifo1.png",
      title: "تيفو بيراميدز الأول",
    },
    {
      src: "/tifo2.png",
      title: "تيفو بيراميدز الثاني",
    },
    {
      src: "/tifo3.png",
      title: "تيفو بيراميدز الثالث",
    },
  ];

  // تشغيل/إيقاف الصوت
  const handleAudioToggle = () => {
    if (!showAudio) setShowAudio(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // عند انتهاء الصوت
  React.useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => setIsPlaying(false);
    audioRef.current.addEventListener("ended", handleEnded);
    return () => audioRef.current.removeEventListener("ended", handleEnded);
  }, []);

  // سلايدر التيفوهات
  const nextTifo = (e) => {
    e && e.stopPropagation();
    setCurrentTifoIndex((prev) => (prev + 1) % tifoImages.length);
  };
  const prevTifo = (e) => {
    e && e.stopPropagation();
    setCurrentTifoIndex(
      (prev) => (prev - 1 + tifoImages.length) % tifoImages.length
    );
  };

  // Error handling for images
  const handleImageError = (e) => {
    e.target.style.display = "none";
    console.warn("Image failed to load:", e.target.src);
  };

  // Error handling for audio
  const handleAudioError = () => {
    console.warn("Audio failed to load");
    setIsPlaying(false);
  };

  return (
    <motion.section
      className="section slide-section"
      style={{ backgroundImage: "url(/13.png)" }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.2 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="slide-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <motion.h2
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          style={{
            textAlign: "center",
            marginBottom: "30px",
            background: "linear-gradient(135deg, #64b5f6, #1976d2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          🎵 الأغاني والتيفوهات
        </motion.h2>
        <div style={{ display: "flex", gap: "2rem", marginBottom: "30px" }}>
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 8px 25px rgba(100, 181, 246, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAudioToggle}
            className="enhanced-button"
            style={{
              background: "var(--primary-gradient)",
              minWidth: "200px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              letterSpacing: "0.5px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>🎵</span>
            أغاني الجماهير
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 8px 25px rgba(255, 193, 7, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowTifoModal(true)}
            className="enhanced-button"
            style={{
              background: "var(--secondary-gradient)",
              minWidth: "200px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              letterSpacing: "0.5px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>🖼️</span>
            التيفوهات
          </motion.button>
        </div>
        {/* مشغل الصوت */}
        {showAudio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "-10px",
              marginBottom: "30px",
              background: "rgba(255,255,255,0.18)",
              borderRadius: "32px",
              padding: "30px 40px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backdropFilter: "blur(18px)",
              minWidth: "400px",
            }}
          >
            <div
              style={{
                background: "rgba(100,181,246,0.12)",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "20px",
                border: "1px solid rgba(100,181,246,0.2)",
              }}
            >
              <audio
                ref={audioRef}
                src="/ultras1.mp3"
                controls
                style={{
                  width: "350px",
                  outline: "none",
                  borderRadius: "15px",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={handleAudioError}
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255,193,7,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAudioToggle}
              style={{
                background: isPlaying
                  ? "linear-gradient(135deg, #d32f2f, #b71c1c)"
                  : "linear-gradient(135deg, #ffc107, #ff9800)",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "15px 35px",
                fontSize: "1.1rem",
                fontWeight: "600",
                fontFamily:
                  "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(255,193,7,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                letterSpacing: "0.5px",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>
                {isPlaying ? "⏸️" : "▶️"}
              </span>
              {isPlaying ? "إيقاف الأغنية" : "تشغيل الأغنية"}
            </motion.button>
          </motion.div>
        )}
        {/* نافذة التيفوهات */}
        <AnimatePresence>
          {showTifoModal && (
            <motion.div
              className="tifo-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTifoModal(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(30, 42, 70, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                backdropFilter: "blur(8px)",
              }}
            >
              <motion.div
                className="tifo-modal-content enhanced-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  padding: "40px 30px 30px 30px",
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setShowTifoModal(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    background: "rgba(255,255,255,0.25)",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#1976d2",
                    fontSize: "18px",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                  }}
                >
                  <X size={20} />
                </motion.button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    minWidth: "500px",
                  }}
                >
                  <motion.button
                    className="nav-btn prev-btn"
                    onClick={prevTifo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "rgba(100,181,246,0.12)",
                      border: "none",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#1976d2",
                      fontSize: "28px",
                      fontWeight: "600",
                      fontFamily:
                        "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  >
                    ‹
                  </motion.button>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <motion.img
                      key={currentTifoIndex}
                      src={tifoImages[currentTifoIndex].src}
                      alt={tifoImages[currentTifoIndex].title}
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        maxWidth: "800px",
                        maxHeight: "60vh",
                        borderRadius: "18px",
                        boxShadow: "0 10px 30px rgba(100,181,246,0.13)",
                      }}
                      onError={handleImageError}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{ marginTop: "18px", color: "#222" }}
                    >
                      <h3
                        style={{
                          fontSize: "22px",
                          marginBottom: "8px",
                          color: "#1976d2",
                        }}
                      >
                        {tifoImages[currentTifoIndex].title}
                      </h3>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: "1.7",
                          opacity: 0.9,
                        }}
                      >
                        {tifoImages[currentTifoIndex].description}
                      </p>
                    </motion.div>
                  </div>
                  <motion.button
                    className="nav-btn next-btn"
                    onClick={nextTifo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "rgba(100,181,246,0.12)",
                      border: "none",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#1976d2",
                      fontSize: "28px",
                      fontWeight: "600",
                      fontFamily:
                        "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  >
                    ›
                  </motion.button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "18px",
                  }}
                >
                  {tifoImages.map((_, index) => (
                    <motion.div
                      key={index}
                      onClick={() => setCurrentTifoIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentTifoIndex
                            ? "#1976d2"
                            : "rgba(100,181,246,0.18)",
                        cursor: "pointer",
                        border:
                          index === currentTifoIndex
                            ? "2px solid #fff"
                            : "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

// Thank You Section Component
const ThankYouSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const thankYouSlides = [
    {
      title: "شكراً لوقتك",
      subtitle: "Thank you for your time",
      message: "نشكركم على الاستماع إلى عرض مشروع جماهيرية بيراميدز بالصعيد",
      icon: "🙏",
    },
    {
      title: "أملنا فيكم",
      subtitle: "We hope in you",
      message: "نأمل أن نجد فيكم الشريك الأمثل لتحقيق هذا الحلم الكبير",
      icon: "🌟",
    },
    {
      title: "رؤية المستقبل",
      subtitle: "Vision of the future",
      message: "معاً نصنع مستقبلاً مشرقاً لكرة القدم في الصعيد",
      icon: "⚽",
    },
    {
      title: "بيراميدز للجميع",
      subtitle: "Pyramids for everyone",
      message: "بيراميدز ليس مجرد نادي، بل هو رسالة وأمل لكل أبناء الصعيد",
      icon: "🏆",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % thankYouSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + thankYouSlides.length) % thankYouSlides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="section slide-section"
      style={{
        backgroundImage: "url(/)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, staggerChildren: 0.1 },
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="slide-content">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "30px",
            padding: "50px",
            marginBottom: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div style={{ position: "relative", minHeight: "400px" }}>
            {/* Navigation Buttons */}
            <motion.button
              className="nav-btn prev-btn"
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                left: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(100,181,246,0.12)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#1976d2",
                fontSize: "28px",
                fontWeight: "600",
                fontFamily:
                  "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                zIndex: 10,
              }}
            >
              ‹
            </motion.button>

            <motion.button
              className="nav-btn next-btn"
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(100,181,246,0.12)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#1976d2",
                fontSize: "28px",
                fontWeight: "600",
                fontFamily:
                  "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                zIndex: 10,
              }}
            >
              ›
            </motion.button>

            {/* Slide Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "400px",
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: "4rem",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 0 20px rgba(100, 181, 246, 0.5))",
                }}
              >
                {thankYouSlides[currentSlide].icon}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "10px",
                  background: "linear-gradient(135deg, #64b5f6, #1976d2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {thankYouSlides[currentSlide].title}
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "30px",
                  background:
                    "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily:
                    "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  letterSpacing: "1px",
                  textShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                }}
              >
                {thankYouSlides[currentSlide].subtitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#1976d2",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  fontFamily:
                    "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontWeight: "600",
                }}
              >
                {thankYouSlides[currentSlide].message}
              </motion.p>
            </motion.div>

            {/* Slide Indicators */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              {thankYouSlides.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentSlide
                        ? "#1976d2"
                        : "rgba(100,181,246,0.3)",
                    cursor: "pointer",
                    border: index === currentSlide ? "2px solid #fff" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default App;
