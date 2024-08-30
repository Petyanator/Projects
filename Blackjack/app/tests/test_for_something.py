from src.mathbomb import math_boom
def test_mathbomb():
    assert math_boom(5,5) == 10
    assert math_boom(1, 10) == 11
    assert math_boom(-5, 30) == 25