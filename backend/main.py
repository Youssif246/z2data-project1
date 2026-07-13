# Import The Required Moudules
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import pyodbc

# Connect To The Database
def connection():
    server = 'DESKTOP-JKOM7TP'        
    database = 'Z2dataProducts'
    conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'
    conn = pyodbc.connect(conn_str)
    return conn

# Make the APIs
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Check Login API
@app.route('/api/checklogin', methods = ['POST'])
def checkLogin():  
    conn = connection()
    cursor = conn.cursor()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    cursor.execute("SELECT * FROM UserAccount WHERE Email = ? AND Password = ?", (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()      
    if user:
        return [{'status':'yes'}]
    else:
        return [{'status':'no'}]
    
# Get Phones API    
@app.route('/api/dashboard/phones')
def getPhones():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Phone')
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    phones = [dict(zip(columns, row)) for row in rows]
    cursor.close()
    conn.close()
    return jsonify(phones)
    
# Get Laptops API
@app.route('/api/dashboard/laptops')
def getLapTops():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Laptop')
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    laptops = [dict(zip(columns, row)) for row in rows]
    cursor.close()
    conn.close()
    return jsonify(laptops)
    
# Get Tablets API    
@app.route('/api/dashboard/tablets')
def getTablets():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Tablet')
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    Tablets = [dict(zip(columns, row)) for row in rows]
    cursor.close()
    conn.close()
    return jsonify(Tablets)

# Get Search Results
@app.route('/api/dashboard/search')
def search():
    conn = connection()
    cursor = conn.cursor()
    category = request.args.get('category')
    quary = request.args.get('quary')
    cursor.execute(f"""
    SELECT * FROM {category} WHERE 
    ProductName LIKE ?
    OR Brand LIKE ?
    OR Price LIKE ?
    OR Spec1 LIKE ?
    OR Spec2 LIKE ?
    OR Spec3 LIKE ?
    """,(f'%{quary}%', f'%{quary}%', f'%{quary}%' ,f'%{quary}%' ,f'%{quary}%' ,f'%{quary}%'))
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    results = [dict(zip(columns, row)) for row in rows]
    cursor.close()
    conn.close()
    return jsonify(results)

# AI API Integration
def AI_API_INIT(prompt):
    genai.configure(api_key="AIzaSyCrP0vbp2P9UmVCXYD30qSyals0xaV2cNw")
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Get AI API Results
@app.route('/api/dashboard/compare', methods = ['POST'])
def compare():
    prompt = ''
    productsNames = ''
    description = ''
    data = request.get_json()
    if data:
        for product in data["comparedPhones"]:
            productsNames = productsNames + f'{product["ProductName"]}, '
            description = description + f'{product["Spec1"]}, '
            description = description + f'{product["Spec2"]}, '
            description = description + f'{product["Spec3"]}, '
            description = description + '|| '
        prompt = prompt + productsNames + description
        full_prompt = f"""
        I will give you products names and some of their specifications. 
        (size, edition, camera). 

        At the end, give me a very concise recommendation only
        (max 3 lines only).
        - Return only valid JSON.
        - never never never ever wrap the JSON in markdown code blocks (```json).
        - Do not add any explanation or text outside the JSON.
        {prompt}
        """
        answer = AI_API_INIT(full_prompt)  
        return (answer)
    else:
        return jsonify({'status':'no'})

if __name__ == '__main__':
    app.run(debug=True)