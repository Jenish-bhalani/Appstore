import tkinter as tk
from tkinter import messagebox
import mysql.connector as c
root = tk.Tk()
root.title("Sign-up Form")

def login_function():
    # print(uname)
    uname = e1.get()
    pswd = e2.get()
    con = c.connect(host="localhost",user="root",passwd="",database="student")
    cur = con.cursor()
    cur.execute("select * from authentication where uname=%s and password=%s",(uname,pswd)) 
    record = cur.fetchone() 
    if record:  
       messagebox.showinfo('welcome','you are login successfully')
       root2.destroy()
       root.destroy()
    else:
        messagebox.showwarning('sorry','username and password not exists plese sign-up')
        root2.destroy()
    con.close()
   
def loginForm():
    global e1
    global e2
    global root2
    root2 = tk.Toplevel(root)
    root2.geometry("500x500")
    root2.title('sign-in')
    l1 = tk.Label(root2,text="Enter username")
    l1.place(x=10,y=20)
    l2 = tk.Label(root2,text="Enter password")
    l2.place(x=10,y=40)
    e1 = tk.Entry(root2)
    e1.place(x=100,y=20)
    e2 = tk.Entry(root2,show='*')
    e2.place(x=100,y=40)
    tk.Button(root2,text="login",command=login_function).place(x=70,y=80)
    tk.Label(root2,text='if you new then sing-up first?').place(x=20,y=120)
    sign_link = tk.Label(root2,text='sign-up',fg='blue',cursor='hand2')
    sign_link.place(x=180,y=120)
    sign_link.bind("<Button-1>",on_signup_lick_click)
 
def on_signup_lick_click(event):
    root2.destroy()
    
def on_login_lick_click(event):
    loginForm()
    
def signup():
    uname = userName.get()
    age = int(age1.get())
    city = city1.get()
    password = password1.get()
    #print(uname,age,city,password)
    con = c.connect(host="localhost",user="root",passwd="",database="student")
    cur = con.cursor()
    #cur.execute("Select * from authentication where uname=%s",(uname))
    cur.execute("select * from authentication where uname=%s",(uname,)) 
    userExist = cur.fetchone()
    if userExist :
        messagebox.showwarning('warning','username is already exists please login')
        userName.delete(0,tk.END)
        age1.delete(0,tk.END)
        city1.delete(0,tk.END)
        password1.delete(0,tk.END)  
        loginForm()
        con.close()
    else:
        query = "insert into authentication (uname,age,city,password) values(%s,%s,%s,%s)"
        values = (uname,age,city,password)
        cur.execute(query,values)
        con.commit()
        messagebox.showinfo("success","you are successfully sign-up")
        userName.delete(0,tk.END)
        age1.delete(0,tk.END)
        city1.delete(0,tk.END)
        password1.delete(0,tk.END)  
        loginForm()
        con.close()
    
tk.Label(root,text="Enter UserName").place(x=10,y=20)
tk.Label(root,text="Enter Age").place(x=10,y=40)
tk.Label(root,text="Enter City").place(x=10,y=60)
tk.Label(root,text="Enter Password").place(x=10,y=80)

userName = tk.Entry(root)
age1= tk.Entry(root)
city1 = tk.Entry(root)
password1 = tk.Entry(root,show="*")

userName.place(x=120,y=20)
age1.place(x=120,y=40)
city1.place(x=120,y=60)
password1.place(x=120,y=80)

tk.Button(root,text="Sign-up",command=signup).place(x=80,y=120)
tk.Label(root,text='i am already register').place(x=10,y=150)
login_link = tk.Label(root,text="Login",fg="Blue",cursor='hand2')
login_link.place(x=120,y=150)
login_link.bind("<Button-1>",on_login_lick_click)

root.mainloop()