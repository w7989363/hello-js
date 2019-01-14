/*
     ██  █████  ███████ ███    ███ ██ ███    ██ ███████
     ██ ██   ██ ██      ████  ████ ██ ████   ██ ██
     ██ ███████ ███████ ██ ████ ██ ██ ██ ██  ██ █████
██   ██ ██   ██      ██ ██  ██  ██ ██ ██  ██ ██ ██
 █████  ██   ██ ███████ ██      ██ ██ ██   ████ ███████
*/

/*
用法
src文件夹下放置需要测试的js源码
spec文件夹下放置测试用例
在SpecRunner中通过script标签引入src和spec即可运行测试

jasmine单元测试有二个核心的部分：describe 函数块和it函数块
describe定义一个测试集，可以嵌套；
it定义一个测试用例，测试用例中的所有断言都正确的时候则通过；
expect定义一个断言，参数为js表达式；后面跟to语句；

toBe()：相当于===比较。
toNotBe()
toBeDefined()：检查变量或属性是否已声明且赋值。
toBeUndefined()
toBeNull()：是否是null。
toBeTruthy()：如果转换为布尔值，是否为true。
toBeFalsy()
toBeLessThan()：数值比较，小于。
toBeGreaterThan()：数值比较，大于。
toEqual()：相当于==，注意与toBe()的区别。一个新建的Object不是（not to be）另一个新建的Object，但是它们是相等（to equal）的。
expect({}).not.toBe({});
expect({}).toEqual({});
toNotEqual()
toContain()：数组中是否包含元素（值）。只能用于数组，不能用于对象。
toBeCloseTo()：数值比较时定义精度，先四舍五入后再比较。
toHaveBeenCalled()：可以检查function是否被调用过
toHaveBeenCalledWith()：可以检查传入参数是否被作为参数调用过。
toMatch()：按正则表达式匹配。
toNotMatch()
toThrow()：检验一个函数是否会抛出一个错误

*/

describe("my first test", function(){
    var test = 0;
    // 执行每个测试用例前调用
    beforeEach(function(){
        test = 1;
    })
    // 执行每个测试用例后调用
    afterEach(function(){
        test = 2;
    })
    // 定义一个测试用例
    it("my first case",function(){
        expect(test).toBe(1);
        expect(false).toBe(false);
        expect("a").not.toBe("b");
    })

    // 可以嵌套describe测试集，形成一棵树
    describe("nested test", function(){
        // 如果需要屏蔽某些测试用例，可以在前面加上x : xdescribe xit
        xit("not to be test", function(){
            // nothing
        })
    });

});

/*
spyOn监视函数的调用情况
toHaveBeenCalled()：可以检查function是否被调用过，
toHaveBeenCalledWith(params)： 可以检查传入参数是否被作为参数调用过。
对被监视函数的调用不会影响真实的值。

spyOn().and配置 :
.and.callThrough() : 实际调用
.and.returnValue(value) : 指定被监视函数的固定返回值value
.and.callFake(function) : 指定被监视函数执行一个假的自定义函数
.and.throwError("err") : 模拟抛出异常

foo.setBar.calls属性 :
.calls.any() : 被Spy的函数一旦被调用过，则返回true，否则为false；
.calls.count() : 返回被Spy的函数的被调用次数；
.calls.argsFor(index) : 返回被Spy的函数的调用参数，以index来指定参数；
.calls.allArgs() : 返回被Spy的函数的所有调用参数；
.calls.all() : 返回calls的上下文，这将返回当前calls的整个实例数据；
.calls.mostRecent() : 返回calls中追踪的最近一次的请求数据；
.calls.first() : 返回calls中追踪的第一次请求的数据；
.object : 当调用all()，mostRecent()，first()方法时，返回对象的object属性返回的是当前上下文对象；
.calls.reset() : 重置Spy的所有追踪数据；

*/
describe("spy on test", function(){
    var foo, bar, test;
    beforeEach(function(){
        // 定义foo
        foo = {
            setBar : function(value){
                bar = value;
            },
            getBar : function(){
                return bar;
            }
        };
        // 添加监视，如果希望实际执行，需要加上.and.callThrough()
        spyOn(foo, "setBar").and.callThrough();
        // 实际执行
        foo.setBar(123);
        // 添加监视，不实际执行
        spyOn(foo, "getBar");
        // 模拟调用，不会影响test实际的值
        test = foo.getBar();

    });

    it("tracks that the setBar was called", function(){
        expect(foo.setBar).toHaveBeenCalled();
        // calls属性的用法
        expect(foo.setBar.calls.any()).toEqual(true);
    });

    it("tracks that the setBar was called with param", function(){
        expect(foo.setBar).toHaveBeenCalledWith(123);
    });

    it("foo is till null", function(){
        // 由于是模拟调用，test仍然是undefined
        expect(test).toBeUndefined();

        // 由于是实际调用，bar为123
        expect(bar).toEqual(123);

    });

})
