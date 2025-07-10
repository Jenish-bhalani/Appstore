#create list with different name and used membership operator
names = ["jenish","bhaumik","ankit","dev","vasu"]
nm = input("Enter any name : ")

if nm in names:
    print("it does exist in the list")
else:
    print("it doesn't exist in the list")