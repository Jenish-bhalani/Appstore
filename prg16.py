#input 3 variables values from user and check which one is greatest
n1 = int(input("Enter n1 : "))
n2 = int(input("Enter n2 : "))
n3 = int(input("Enter n3 : "))

if n1 > n2:
    if n1 >n3:
        print(n1," is the greatest")
    else:
        print(n3," is the greatest")
elif n2 > n3:
    print(n2," is the greatest")
