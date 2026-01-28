# AI-Driven Job Market Analysis, Recommendation, and Skill Training Framework
# 人工智能驅動的就業市場分析、工作推薦與技能培訓框架

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Django](https://img.shields.io/badge/Django-Framework-green)
![AI](https://img.shields.io/badge/AI-PyTorch%20%7C%20LLM-orange)

## 📖 Abstract / 摘要

**English**
This project addresses the critical issue of youth unemployment in Malaysia by leveraging Artificial Intelligence (AI) to bridge the gap between job seekers and market demands. The system provides a comprehensive framework that:
1.  **Analyzes** current job market trends using real-time data.
2.  **Recommends** suitable jobs to candidates based on their profiles.
3.  **Identifies Skill Gaps** and suggests relevant training programs to enhance employability.

The solution aims to reduce skill mismatches and provide data-driven insights for both job seekers and policy makers.

**中文**
本項目旨在利用人工智能（AI）技術縮小求職者與市場需求之間的差距，從而解決馬來西亞青年失業這一關鍵問題。該系統提供了一個綜合框架，能夠：
1.  **分析** 利用實時數據分析當前的就業市場趨勢。
2.  **推薦** 根據候選人的個人資料推薦合適的工作。
3.  **識別技能差距** 並建議相關的培訓課程以提升就業能力。

該方案旨在減少技能不匹配問題，並為求職者和政策制定者提供數據驅動的洞察。

---

## 📌 Project Information / 項目信息

* **Title / 標題**: Developing an AI-Driven Job Market Analysis, Job Recommendation, and Skill Training Framework to Address Youth Unemployment in Malaysia.
* **Author / 作者**: Lu Yee Chen (TP067683)
* **Institution / 機構**: Asia Pacific University of Technology and Innovation (APU)
* **Supervisor / 導師**: Salasiah Binti Sulaiman

---

## ✨ Key Features / 主要功能

| Feature (English) | 功能 (中文) |
| :--- | :--- |
| **Market Trend Analysis** | **市場趨勢分析**：可視化馬來西亞的高需求職位和新興行業。 |
| **Intelligent Job Recommendation** | **智能工作推薦**：使用 AI 算法將用戶資料（技能、學歷）與現有職位進行匹配。 |
| **Skill Gap Analysis** | **技能差距分析**：自動檢測目標職位所需的缺失技能。 |
| **Training Recommendations** | **培訓推薦**：建議相關課程和認證以彌補識別出的技能差距。 |
| **User Profiling** | **用戶畫像**：綜合管理候選人檔案，包括簡歷解析和技能標籤。 |

---

## 🛠 Tech Stack / 技術棧

This project is built using a robust full-stack architecture integrated with AI modules.
本項目採用集成了 AI 模塊的穩健全棧架構構建。

| Component | Technologies / 技術 |
| :--- | :--- |
| **Backend** | Python, Django, Gunicorn |
| **Frontend** | HTML5, CSS3, JavaScript (Bootstrap/Tailwind) |
| **AI & ML** | PyTorch, Large Language Models (LLMs), Scikit-learn |
| **Database** | PostgreSQL / SQLite (Managed via Django ORM & SQLAlchemy) |
| **Deployment** | Nginx, Gunicorn, Docker (Optional) |
| **Tools** | PyCharm, Git |

---

## 🚀 Installation & Setup / 安裝與設置

Follow these steps to set up the project locally.
請按照以下步驟在本地設置項目。

### 1. Clone the Repository / 克隆倉庫
```bash
git clone [https://github.com/LuYeeChen1/FYP-Job-Market-Analysis.git](https://github.com/LuYeeChen1/FYP-Job-Market-Analysis.git)
cd FYP-Job-Market-Analysis

```

### 2. Create Virtual Environment / 創建虛擬環境

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

```

### 3. Install Dependencies / 安裝依賴

```bash
pip install -r requirements.txt

```

### 4. Database Migration / 數據庫遷移

```bash
python manage.py makemigrations
python manage.py migrate

```

### 5. Run the Server / 運行服務器

```bash
python manage.py runserver

```

Access the application at / 訪問應用地址: `http://127.0.0.1:8000/`

---

## 📊 System Architecture / 系統架構

The system utilizes a **Model-View-Template (MVT)** architecture provided by Django. The AI modules operate as integrated services that process data from the database and return recommendations to the view layer.

本系統採用 Django 提供的 **模型-視圖-模板 (MVT)** 架構。AI 模塊作為集成服務運行，處理來自數據庫的數據並將推薦結果返回給視圖層。

---

## 📄 License & Acknowledgments / 許可與致謝

This project is a Final Year Project submitted to **Asia Pacific University of Technology and Innovation (APU)**.
本項目是提交給 **亞太科技大學 (APU)** 的畢業設計項目 (FYP)。

* **Supervisor**: Ms. Salasiah Binti Sulaiman
* **Second Marker**: Mr. Justin Gilbert A/L Alexius Silvester
