# SmartMatch: AI-Driven Job Market Analysis & Recommendation Framework
# SmartMatch: 人工智能驅動的就業市場分析與推薦框架

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Django](https://img.shields.io/badge/Backend-Django%20REST-green)
![Frontend](https://img.shields.io/badge/Frontend-Dashboard-blueviolet)
![AI](https://img.shields.io/badge/AI-PyTorch%20%7C%20LLM-orange)

## 📂 Repository Access / 倉庫訪問導航

This project is architected as a decoupled system. Please access the specific repositories below for source code.
本項目採用前後端分離架構。請點擊下方鏈接訪問具體源代碼。

| Component | Repository Link | Description |
| :--- | :--- | :--- |
| **Frontend (Dashboard)** | [**SmartMatch-Dashboard**](https://github.com/LuYeeChen1/SmartMatch-Dashboard.git) | User Interface for job seekers and admins. <br> (求職者與管理員使用的前端儀表盤) |
| **Backend (Core API)** | [**SmartMatch-Core-API**](https://github.com/LuYeeChen1/SmartMatch-Core-API.git) | RESTful API, AI Engine, and Database Logic. <br> (核心 API、AI 引擎與數據庫邏輯) |

---

## 📖 Abstract / 摘要

**English**
This project addresses the critical issue of youth unemployment in Malaysia by leveraging Artificial Intelligence (AI) to bridge the gap between job seekers and market demands. The system provides a comprehensive framework that:
1.  **Analyzes** current job market trends using real-time data.
2.  **Recommends** suitable jobs to candidates based on their profiles.
3.  **Identifies Skill Gaps** and suggests relevant training programs to enhance employability.

**中文**
本項目旨在利用人工智能（AI）技術縮小求職者與市場需求之間的差距，從而解決馬來西亞青年失業這一關鍵問題。該系統提供了一個綜合框架，能夠：
1.  **分析** 利用實時數據分析當前的就業市場趨勢。
2.  **推薦** 根據候選人的個人資料推薦合適的工作。
3.  **識別技能差距** 並建議相關的培訓課程以提升就業能力。

---

## 📌 Project Information / 項目信息

* **Title**: Developing an AI-Driven Job Market Analysis, Job Recommendation, and Skill Training Framework.
* **Author**: Lu Yee Chen (TP067683)
* **Institution**: Asia Pacific University of Technology and Innovation (APU)
* **Supervisor**: Salasiah Binti Sulaiman

---

## 🛠 Tech Stack / 技術棧

The system operates on a separated architecture ensuring scalability and maintainability.
系統採用分離式架構運行，確保可擴展性和可維護性。

### **1. Backend (Core API)**
* **Framework**: Python, Django, Django REST Framework (DRF)
* **AI & ML**: PyTorch, Large Language Models (LLMs), Scikit-learn (Resume Parsing & Matching)
* **Database**: PostgreSQL / SQLite (Managed via Django ORM)

### **2. Frontend (Dashboard)**
* **UI Framework**: HTML5, CSS3, JavaScript (Modern Responsive Design)
* **Visualization**: Chart.js / D3.js (For Market Trend Analytics)
* **HTTP Client**: Axios / Fetch API

---

## 🚀 Installation & Setup / 安裝與設置

To run the full system locally, please follow the steps for both the Backend and Frontend.
要在本地運行完整系統，請分別按照後端和前端的步驟進行操作。

### **Step 1: Backend Setup (Core API)**

1.  **Clone the API Repository**
    ```bash
    git clone [https://github.com/LuYeeChen1/SmartMatch-Core-API.git](https://github.com/LuYeeChen1/SmartMatch-Core-API.git)
    cd SmartMatch-Core-API
    ```

2.  **Create & Activate Virtual Environment**
    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

### **Step 2: Frontend Setup (Dashboard)**

1.  **Clone the Dashboard Repository** (Open a new terminal)
    ```bash
    git clone [https://github.com/LuYeeChen1/SmartMatch-Dashboard.git](https://github.com/LuYeeChen1/SmartMatch-Dashboard.git)
    cd SmartMatch-Dashboard
    ```

2.  **Install Dependencies**
    *(Depending on your frontend structure, use npm or simple file hosting)*
    ```bash
    npm install
    # OR if using Yarn
    yarn install
    ```

3.  **Configure API Connection**
    * Locate the configuration file (e.g., `.env` or `config.js`).
    * Ensure the `API_BASE_URL` is set to `http://127.0.0.1:8000/`.

4.  **Run Dashboard**
    ```bash
    npm start
    ```
    *The Frontend is now accessible (usually at `http://localhost:3000` or similar).*

---

## 📊 System Architecture / 系統架構

The system utilizes a **Model-View-Template (MVT)** architecture (Backend) coupled with a **SPA (Single Page Application)** or **Responsive Frontend**.

1.  **Data Layer**: Stores job postings, user profiles, and training data.
2.  **AI Engine Layer**: Processes resumes, calculates compatibility scores, and predicts trends.
3.  **API Layer**: Exposes endpoints for the frontend to consume data.
4.  **Presentation Layer**: Displays analytics and recommendations to the user.

---

## 📄 License & Acknowledgments / 許可與致謝

This project is a Final Year Project submitted to **Asia Pacific University of Technology and Innovation (APU)**.
本項目是提交給 **亞太科技大學 (APU)** 的畢業設計項目 (FYP)。

* **Supervisor**: Ms. Salasiah Binti Sulaiman
* **Second Marker**: Mr. Justin Gilbert A/L Alexius Silvester

---
